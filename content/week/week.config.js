export default {
	buildawesomeComputed: {
		title: (data) => `Week ${data.page.fileSlug}`,
		week: (data) => Number(data.page.fileSlug),
	},
}
