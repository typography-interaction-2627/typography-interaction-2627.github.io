export default {
	eleventyComputed: {
		title: (data) => `Week ${data.page.fileSlug}`,
	},
}
