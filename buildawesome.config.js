import { readFileSync } from 'fs'
import { readdir, readFile } from 'fs/promises'
import { resolve, join, dirname, normalize } from 'path'
import path from 'path'

import webC from '@11ty/eleventy-plugin-webc'

import markdownIt from 'markdown-it'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItHeaderSections from 'markdown-it-header-sections'

import { componentPlugin } from '@mdit-vue/plugin-component' // Pretend we are Vue.

import abbreviations from './data/abbreviations.js'

import stripTags from 'striptags'

import { parse } from 'node-html-parser'

import puppeteer from 'puppeteer'

export default (config) => {
	// Setup.
	config.addPlugin(webC, {
		components: 'templates/*/**/*.webc',
		before: page => page.setTransform('md', content => markdown.render(content)),
	})
	config.setFrontMatterParsingOptions({
		delimiters: ['```javascript', '```'],
		language: 'js',
	})
	config.addBundle('css', { toFileDirectory: 'assets' })

	// Watch for changes, full rebuilds needed for re-bundling.
	config.addWatchTarget('**/*.css', { resetConfig: true })
	config.addWatchTarget('**/*.js', { resetConfig: true })

	// Virtual/nested `.webc` don’t invalidate their parent layout's cache:
	// https://github.com/11ty/buildawesome/issues/3468
	// https://github.com/11ty/eleventy-plugin-webc/issues/115
	config.addWatchTarget('templates/**/*.webc', { resetConfig: true })

	// Slide these on over.
	config.addPassthroughCopy({ 'assets/icons/favicon.ico': '/favicon.ico' })
	config.addPassthroughCopy('assets/reset.css')
	config.addPassthroughCopy('assets/**/*.(js|png|svg|woff2)')
	config.addPassthroughCopy('content/**/*.(gif|jpg|png|svg)')

	// Avoid front-matter in `page.webc`.
	config.addTemplate('templates/page.webc', readFileSync('templates/page.webc'), {
		buildawesomeExcludeFromCollections: true,
		layout: 'base',
		permalink: false,
	})
	config.addGlobalData('buildawesomeComputed.layout', () => ({ page }) => page.templateSyntax.includes('md') ? 'page' : 'base')

	// Meta sidecars for `og:image`.
	{
		let changedFiles = new Set()
		const isIncremental = process.argv.includes('--incremental')

		config.on('eleventy.beforeWatch', (changed = []) =>
			changedFiles = new Set(changed.map(f => path.resolve(f)))
		)

		config.addTemplate('templates/meta.webc', readFileSync('templates/meta.webc'), {
			buildawesomeExcludeFromCollections: true,
			pagination: {
				alias: 'meta',
				before: items => items.filter(({ url, inputPath }) =>
					url && (!isIncremental || !changedFiles.size || changedFiles.has(path.resolve(inputPath)))
				),
				data: 'collections.all',
				size: 1,
			},
			permalink: ({ meta }) => `${meta.url}meta.html`,
		})
	}

	// Set up sorted page collections.
	for (const directory of ['', 'week', 'project', 'topic'])
		config.addCollection(directory ? `${directory}s` : 'root', collection => collection
			.getFilteredByGlob(`content/${directory ? `${directory}/{*.md,*/index.md}` : '*.md'}`)
			.sort((a, b) =>
				(a.data.week || Infinity) - (b.data.week || Infinity)
				|| a.data.order - b.data.order
				|| a.inputPath.localeCompare(b.inputPath, undefined, { numeric: true })
			)
		)

	// Don’t render out drafts—but this leaves them in the collections for date calculations.
	process.env.BUILDAWESOME_RUN_MODE === 'build' && config.addGlobalData('buildawesomeComputed.permalink', () => (data) => data.draft ? false : data.permalink)

	// Markdown stuff.
	const markdownOptions = {
		breaks: true,
		html: true,
		linkify: true,
		typographer: true,
	}

	// Remove H1 (pulled for `title`).
	const markdownRemoveH1 = (markdown) => markdown.core.ruler.before('normalize', 'removeH1', (state) =>
		state.src = state.src.replace(/^# .*\n?/m, ''),
	)

	// Append abbreviations for `markdownItAbbr`.
	const mardownAddAbbreviations = (markdown) => {
		const definitions = abbreviations.map((item) => `\n*[${item.abbr}]: ${item.title}`).join('\n')

		markdown.core.ruler.after('normalize', 'abbreviations', (state) =>
			state.src += definitions,
		)
	}

	// Convert HTML comments to curly brackets for `markdownItAttrs` to pick up.
	const markdownCommentsToCurlies = (markdown) => markdown.core.ruler.after('abbreviations', 'commentsToCurlies', (state) =>
		// Only match `.class`…, `#id`…, `data`…, `style`… so example/other comments aren’t transformed.
		state.src = state.src.replace(/<!--\s*(\.(?:[\s\S]*?)|#(?:[\s\S]*?)|data(?:[\s\S]*?)|style(?:[\s\S]*?)|inert)\s*-->$/gm, '{ $1 }'),
	)

	// Heading wrapping/links.
	const markdownAnchors = (markdown) => markdown.use(markdownItAnchor, {
		// TODO Apostrophes!
		// TODO Inline overrides don’t work (search `#external`)! It is the `section` wrapping.
		// TODO Could this be moved to a `.webc` Same for `markdownAsides`?
		permalink: (slug, opts, state, idx) => {
			const headingId = state.tokens[idx].attrs.find(([id]) => id === 'id')[1]
			const headingOpen = state.md.renderer.renderToken(state.tokens, idx, state.options)
			const headingHtml = state.md.renderer.render([state.tokens[idx + 1]], state.options, state.env)
			const headingClose = state.md.renderer.renderToken(state.tokens, idx + 2, state.options)

			const token = new state.Token('html_inline', '', 0)

			token.content =
				`
				<hgroup>
					${headingOpen}${headingHtml}<a href="#${headingId}"></a>${headingClose}
				</hgroup>
				`

			state.tokens.splice(idx, 3, token)
		},
		slugify: config.getFilter('slugify'),
	})

	// Nice `pre` blocks.
	const markdownPreCode = (markdown) => markdown.renderer.rules.fence = (tokens, index, options, env, self) =>
		`<pre ${self.renderAttrs(tokens[index])}>
			<code class="language-${tokens[index].info.trim()}">${markdown.utils.escapeHtml(tokens[index].content)}</code>
		</pre>`

	// Do some automatic ragging.
	const markdownRagging = (markdown) => {
		const singleLetters = 'a|i'
		const shortWords = 'an|as|at|be|in|is|it|of|on|or|to|we'
		const wordStarts = '^|\\s|\\(|\\[|“|‘|—|–' // Start of a token, whitespace, or opening/joining punctuation.

		markdown.core.ruler.after('inline', 'ragging', ({ tokens }) =>
			tokens?.forEach(({ children, type }) =>
				type === 'inline' && children?.forEach((child, index, children) => {
					if (child.type === 'text') {
						// Keep single-letter words with the following…
						child.content = child.content.replace(new RegExp(`(${wordStarts})(${singleLetters}) (\\S)`, 'gi'), '$1$2\u00A0$3') // `&nbsp;`

						// …then two-letter words, but not when the next word is already joined to a single-letter one.
						child.content = child.content.replace(new RegExp(`(${wordStarts})(${shortWords}) (?!\\S*\u00A0)(\\S)`, 'gi'), '$1$2\u00A0$3')

						// Also when the word ends the token and content follows in a node (link, emphasis, etc.)—`nesting` skips closing tags and breaks.
						children[index + 1]?.nesting >= 0 && !/break$/.test(children[index + 1].type) &&
							(child.content = child.content.replace(new RegExp(`(${wordStarts})(${singleLetters}|${shortWords}) $`, 'i'), '$1$2\u00A0'))

						// TODO Breaks `abbr` before!
						// Adds a “word joiner” `&NoBreak;` before em-dashes, to keep them from starting lines.
						child.content = child.content.replace(/—/g, '\u2060—')

						// TODO Breaks `abbr` after!
						// Adds a `&ZeroWidthSpace;` after every slash.
						child.content = child.content.replace(/\//g, '/\u200B')

						// Prevent orphans at the end of a block/paragraph (not just token).
						!children?.slice(index + 1).some((token) => token.type === 'text' && token.content.trim()) &&
							 /[.!?…:;]$/.test(children?.map((token) => token.type === 'text' ? token.content : '').join('').trim()) &&
								(child.content = child.content.replace(/(\S+)\s+(\S+)(?=\s*$)/g,
									(match, prevWord, lastWord, offset, string) =>
										/^\s*$/.test(string.slice(offset + match.length)) && prevWord.length + lastWord.length <= 16
											? `${prevWord}\u00A0${lastWord}`
											: match,
								))
					}
				}),
			),
		)
	}

	// Convert to local links, ex: `../class.md` → `../class/`.
	const markdownLocalLinks = (md) =>
		md.core.ruler.after('inline', 'localLinks', (state) => {
			const isIndex = /(^|\/)index\.md$/.test(state.env.path ?? '')

			for (const { children } of state.tokens) {
				for (const child of children ?? []) {
					if (child.type !== 'link_open') continue

					const href = child.attrGet('href')

					if (!href || href.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue

					const cleaned = href.replace(/([^/?#]+)\.md(?=$|[?#])/, (_, name) => name === 'index' ? '' : `${name}/`)
					const shifted = isIndex ? cleaned : `../${cleaned}`

					child.attrSet('href', normalize(shifted))
				}
			}
		})

	// Turn GitHub Flavored Markdown `> [!NOTE]` blockquotes into `<aside class="note">`, etc.
	const markdownAsides = (md) =>
		md.core.ruler.after('inline', 'alerts', ({ tokens }) => {
			for (let index = 0; index < tokens.length; index++) {
				if (tokens[index].type !== 'blockquote_open') continue

				const [markerOpen, marker, markerClose] = tokens.slice(index + 1, index + 4)
				const type = markerOpen?.type === 'paragraph_open' && marker?.type === 'inline'
					&& marker.content.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]$/)?.[1].toLowerCase()

				if (!type) continue

				tokens[index].tag = 'aside'
				tokens[index].attrSet('class', [type, tokens[index].attrGet('class')].filter(Boolean).join(' '))

				// Find the matching `blockquote_close`, accounting for nested blockquotes.
				let depth = 0
				for (let closeIndex = index + 1; closeIndex < tokens.length; closeIndex++) {
					if (tokens[closeIndex].type === 'blockquote_open') depth++
					else if (tokens[closeIndex].type === 'blockquote_close') {
						if (depth === 0) { tokens[closeIndex].tag = 'aside'; break }
						depth--
					}
				}

				// Drop the `[!TYPE]` marker paragraph now that its info lives on the `aside`.
				tokens.splice(index + 1, 3)
			}
		})

	const markdown = markdownIt(markdownOptions)
		// `abbreviations.js` collides with `markdown-it-abbr` internal map.
		.use(markdown => markdown.core.ruler.before('normalize', 'abbreviationEnv', ({ env }) => delete env.abbreviations))
		.use(markdownRemoveH1)
		.use(mardownAddAbbreviations)
		.use(markdownCommentsToCurlies)
		.use(markdownItAbbr) // TODO can we have this run after ragging?
		.use(markdownItDeflist) // TODO This will not work for GFM right?
		.use(markdownItHeaderSections)
		.use(markdownAnchors)
		.use(markdownItAttrs)
		.use(markdownPreCode)
		.use(markdownRagging)
		.use(markdownLocalLinks)
		.use(markdownAsides)
		.use(componentPlugin) //Allows custom inline HTML component names (otherwise made into strings/wrapped in paragraphs).

	// Filter for component use.
	// TODO We don’t use this anymore?
	config.addFilter('markdown', (content) =>
		markdownIt(markdownOptions)
			.use(mardownAddAbbreviations)
			.use(markdownItAbbr)
			.use(markdownRagging)
			.use(markdownLocalLinks)
			.render(String(content))
			.replace('<p>', '')
			.replace('</p>', '')
			.replace('&amp;', '&')
			.trim(),
	)

	// Overall Markdown use.
	config.setLibrary('md', markdown)

	// Other filters.
	config.addFilter('initialCap', (string) => string?.replace(/^./, firstChar => firstChar.toUpperCase()))
	config.addFilter('displayDate', (date) => new Date(date)
		.toLocaleDateString('en-US', { day: 'numeric', month: 'long', timeZone: 'UTC' }))
	config.addFilter('stripTags', (content) => stripTags(String(content)))
	config.addFilter('parseHtml', (content) => parse(content))

	// Spans for “kerning.”
	const span = (name, character) => `<span aria-hidden="true" class="${name}">${character}</span>`
	const characterClasses = { '&': 'amp', ':': 'colon', '‘': 'lsquo', '’': 'rsquo', '“': 'ldquo', '”': 'rdquo' }

	// Tags and numeric entities pass through; named entities reuse their own name as the class.
	config.addFilter('letterSpans', (content) => String(content)
		.replace(/(<[^>]+>)|(&#\w+;)|(&[a-z]+\d*;)|(&(?![#\w]+;))|([^<&]+)/gi, (match, tag, numeric, named, ampersand, text) =>
			tag ?? numeric
			?? (named ? span(named.slice(1, -1), named) : null)
			?? (ampersand ? span('amp', '&amp;') : null)
			?? text.replace(/[a-z\d:‘’“”]/gi, (character) =>
				span(characterClasses[character] ?? (/\d/.test(character) ? `num${character}` : character), character),
			),
		),
	)

	// Save `meta.html` to `meta.png` for dynamic `og:image`.
	config.on('buildawesome.after', async ({ dir }) => {
		if (process.env.BUILDAWESOME_RUN_MODE !== 'build') return

		const output = resolve(dir.output)
		const entries = await readdir(output, { recursive: true, withFileTypes: true })
		const files = entries
			.filter((entry) => entry.isFile() && entry.name === 'meta.html')
			.map((entry) => join(entry.parentPath, entry.name))

		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-accelerated-2d-canvas'],
		})

		try {
			await Promise.all(files.map(async (file) => {
				const page = await browser.newPage()

				await page.setRequestInterception(true)

				page.on('request', async (req) => {
					try {
						const pathname = new URL(req.url()).pathname
						const body = await readFile(join(output, pathname))
						const contentType = pathname.endsWith('.svg') ? 'image/svg+xml' : undefined

						await req.respond({ body, contentType, status: 200 })
					} catch {
						await req.abort()
					}
				})

				await page.setViewport({ deviceScaleFactor: 2, height: 540, width: 720 })
				await page.goto(`http://localhost/${file.replace(output + '/', '')}`, { waitUntil: 'load' })
				await page.screenshot({ path: join(dirname(file), 'meta.png') })
				await page.close()
			}))
		} finally {
			await browser.close()
		}
	})

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			data: '../data',
			layouts: '../templates',
		},
		markdownTemplateEngine: false, // Turn off `liquid` parsing.
		htmlTemplateEngine: 'webc',
	}
}
