import { utimes } from 'node:fs/promises'
import { readFileSync } from 'node:fs'

import webC from '@11ty/eleventy-plugin-webc'

import markdownIt from 'markdown-it'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItHeaderSections from 'markdown-it-header-sections'

import abbreviations from './data/abbreviations.js'

export default (config) => {
	// Setup.
	config.setDataFileSuffixes(['.config'])
	config.addPlugin(webC, { components: 'templates/*/**/*.webc' })
	config.setFrontMatterParsingOptions({
		delimiters: ['```javascript', '```'],
		language: 'js',
	})

	// Avoid front-matter in `page.webc`.
	config.addTemplate('templates/page.webc', readFileSync('templates/page.webc', 'utf8'), { layout: 'base' })
	config.addGlobalData('buildawesomeComputed.layout', () => ({ page }) => page.templateSyntax.includes('md') ? 'page' : 'base')

	// Allow in-Markdown `title` via H1.
	config.addGlobalData('markdownH1', () => (data) => data.page.rawInput.match(/^# (.+)/m)?.[1].trim() || data.title)

	// Set up sorted page collections.
	for (const directory of ['', 'week', 'project', 'topic'])
		config.addCollection(directory ? `${directory}s` : 'root', collection => collection
			.getFilteredByGlob(`content/${directory ? `${directory}/{*.md,*/index.md}` : '*.md'}`)
			.sort((a, b) =>
				a.data.week - b.data.week
				|| a.data.order - b.data.order
				|| a.inputPath.localeCompare(b.inputPath, undefined, { numeric: true })
			)
		)

	// Don’t render out drafts—but this leaves them in the collections for date calculations.
	process.env.ELEVENTY_RUN_MODE === 'build' && config.addGlobalData('buildawesomeComputed.permalink', () => (data) => data.draft ? false : data.permalink)

	// Nested `.webc` components don’t invalidate their parent layout's cache:
	// https://github.com/11ty/eleventy-plugin-webc/issues/115
	config.on('eleventy.beforeWatch', (changedFiles) =>
		changedFiles.some((filePath) => filePath.endsWith('.webc') && !filePath.endsWith('base.webc'))
		&& utimes('templates/base.webc', new Date(), new Date())
	)

	// Markdown stuff.
	const markdownOptions = {
		breaks: true,
		html: true,
		linkify: true,
		typographer: true,
	}

	// Do some automatic ragging.
	const markdownRagging = (markdown) => {
		const shortWords = 'a|an|as|at|I|in|is|it|of|on|to'

		markdown.core.ruler.after('inline', 'ragging', ({ tokens }) =>
			tokens?.forEach(({ children, type }) =>
				type === 'inline' && children?.forEach((child, index, children) => {
					if (child.type === 'text') {
						// Keep short words with the following…
						child.content = child.content.replace( new RegExp(`(\\s|^)(${shortWords}) (\\S)`, 'gi'), '$1$2\u00A0$3') // `&nbsp;`

						// Adds a “word joiner” `&NoBreak;` before em-dashes, to keep them from starting lines.
						child.content = child.content.replace(/—/g, '\u2060—')

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

	const markdown = markdownIt(markdownOptions)
		.use((markdown) => markdown.render = (src, env = {}) => {
			delete env.abbreviations // Fix name collision with global `env.abbreviations` data and `markdown-it-abbr`.
			return markdown.constructor.prototype.render.call(markdown, String(src).replace(/^# .*\n?/m, ''), env) // Remove H1 (pulled for `title`).
		})
		.use(markdownItAbbr)
		.use(markdownItDeflist)
		.use(markdownItHeaderSections)
		.use(markdownItAnchor, {
			permalink: (slug, opts, state, idx) => {
				const headingId = state.tokens[idx].attrs.find(([id]) => id === 'id')[1]
				const headingOpen = state.md.renderer.renderToken(state.tokens, idx, state.options)
				const headingHtml = state.md.renderer.render([state.tokens[idx + 1]], state.options, state.env)
				const headingClose = state.md.renderer.renderToken(state.tokens, idx + 2, state.options)

				const token = new state.Token('html_inline', '', 0)

				token.content =
					`
					<hgroup>
						${headingOpen}${headingHtml}${headingClose}
						<a href="#${headingId}" aria-labelledby="${headingId}"></a>
					</hgroup>
					`

				state.tokens.splice(idx, 3, token)
			},
			slugify: config.getFilter('slugify'),
		})
		.use(markdownItAttrs)
		.use((markdown) => markdown.renderer.rules.fence = (tokens, index, options, env, self) =>
			`<pre ${self.renderAttrs(tokens[index])}>
				<code class="language-${tokens[index].info.trim()}">${markdown.utils.escapeHtml(tokens[index].content)}</code>
			</pre>`,
		)
		.use(markdownRagging)

	// Append abbreviations for `markdownItAbbr`.
	const markdownAbbreviations = abbreviations.map((item) => `\n*[${item.abbr}]: ${item.title}`).join('\n')

	// Append them for the plugin.
	config.addPreprocessor('abbreviations', '.md', (data, content) => content + markdownAbbreviations)

	// Convert HTML comments to curly brackets for `markdownItAttrs` to pick up.
	config.addPreprocessor('commentsToCurlies', '.md', (data, content) =>
		// Only match `.class`…, `#id`…, `data`…, `style`… so example/other comments aren’t transformed.
		 content.replace(/<!--\s*(\.(?:[\s\S]*?)|#(?:[\s\S]*?)|data(?:[\s\S]*?)|style(?:[\s\S]*?)|inert)\s*-->$/gm, '{ $1 }'),
	)

	// Filter for component use.
	config.addFilter('markdown', (content) =>
		markdownIt(markdownOptions)
			.use(markdownItAbbr)
			.use(markdownRagging)
			.render(String(content + markdownAbbreviations))
			.replace('<p>', '')
			.replace('</p>', '')
			.replace('&amp;', '&')
			.trim(),
	)

	// Overall Markdown use.
	config.setLibrary('md', markdown)

	// Other filters.
	// config.addFilter('stripTags', (content) => stripTags(String(content)))
	config.addFilter('capitalize', (string) => string?.replace(/^./, firstChar => firstChar.toUpperCase()))
	config.addFilter('displayDate', (date) => new Date(date)
		.toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' })
		.replace(/(\w{3})/, (month) => month === 'May' ? month : month + '.'))

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
