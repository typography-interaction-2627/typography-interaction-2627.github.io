import { utimes } from 'node:fs/promises'
import { readFileSync } from 'node:fs'

import webC from '@11ty/eleventy-plugin-webc'

export default (config) => {
	// Setup.
	config.setDataFileSuffixes(['.config'])
	config.addPlugin(webC, { components: 'templates/*/**/*.webc' })
	config.setFrontMatterParsingOptions({
		delimiters: ['<script front-matter>', '</script>'],
		language: 'js',
	})

	// Avoid front-matter in `page.webc`.
	config.addGlobalData('buildawesomeComputed.layout', () => ({ page }) => page.templateSyntax.includes('md') ? 'page' : 'base')
	config.addTemplate('page.webc', readFileSync('templates/page.webc', 'utf8'), { layout: 'base' })

	// Other filters.
	// config.addFilter('stripTags', (content) => stripTags(String(content)))
	config.addFilter('capitalize', (string) => string?.replace(/^./, firstChar => firstChar.toUpperCase()))
	config.addFilter('displayDate', (date) => new Date(date)
		.toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' })
		.replace(/(\w{3})/, (month) => month === 'May' ? month : month + '.'))

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
	process.env.ELEVENTY_RUN_MODE === 'build' && config.addGlobalData('buildawesomeComputed', { permalink: (data) => data.draft ? false : data.permalink })

	// Nested `.webc` components don’t invalidate their parent layout's cache:
	// https://github.com/11ty/eleventy-plugin-webc/issues/115
	config.on('eleventy.beforeWatch', (changedFiles) =>
		changedFiles.some((filePath) => filePath.endsWith('.webc') && !filePath.endsWith('base.webc'))
		&& utimes('templates/base.webc', new Date(), new Date())
	)

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
