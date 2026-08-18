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
