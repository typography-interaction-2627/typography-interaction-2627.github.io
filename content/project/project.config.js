const getMarkdownTitle = (data) =>
	data.page.rawInput.match(/^# (.+)/m)?.[1].trim() || data.title

export default {
	buildawesomeComputed: {
		title: (data) => Number.isInteger(+data.page.fileSlug)
			? `Project ${data.page.fileSlug}: “${getMarkdownTitle(data)}”`
			: `Project “${getMarkdownTitle(data)}”`,
	},
}
