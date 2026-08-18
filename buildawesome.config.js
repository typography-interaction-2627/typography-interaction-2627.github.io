import webC from '@11ty/eleventy-plugin-webc'

export default (config) => {
	// Setup.
	config.addGlobalData('layout', 'base.webc')
	config.addPlugin(webC, { components: 'templates/inline/**/*.webc' })
	config.setFrontMatterParsingOptions({
		delimiters: ['<script front-matter>', '</script>'],
		language: 'js',
	})
	config.setDataFileSuffixes(['.config'])

	// Set up sorted collections.
	for (const directory of ['week', 'project', 'topic'])
		config.addCollection(`${directory}s`, collection =>
			collection.getFilteredByGlob(`content/${directory}/{*.md,*/index.md}`)
				.sort((a, b) =>
					a.data.week - b.data.week ||
					a.inputPath.localeCompare(b.inputPath, undefined, { numeric: true })
				)
		)

	// Don’t render out drafts—but this leaves them in the collections for date calculations.
	process.env.ELEVENTY_RUN_MODE === 'build' && config.addGlobalData('buildawesomeComputed', { permalink: (data) => data.draft ? false : data.permalink })

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			layouts: '../templates',
		},
		htmlTemplateEngine: 'webc',
	}
}
