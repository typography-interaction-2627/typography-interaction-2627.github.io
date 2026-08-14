import webC from '@11ty/eleventy-plugin-webc'

export default (config) => {
	// Setup.
	config.addGlobalData('layout', 'base.webc')
	config.addPlugin(webC, { components: 'templates/inline/**/*.webc' })

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
