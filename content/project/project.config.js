export default {
	buildawesomeComputed: {
		title: (data) => Number.isInteger(+data.page.fileSlug)
			? `Project ${data.page.fileSlug}: “${data.markdownH1(data)}”`
			: `Project “${data.markdownH1(data)}”`,
	},
}
