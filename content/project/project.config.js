export default {
	buildawesomeComputed: {
		title: (data) => Number.isInteger(+data.page.fileSlug)
			? `Project ${data.page.fileSlug}: “${data.title}”`
			: `Project “${data.title}”`,
	},
}
