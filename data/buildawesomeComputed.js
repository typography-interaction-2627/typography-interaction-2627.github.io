// Count up our dates and units.
const getWeek = (data) => {
	const week = data.week || data.page.fileSlug
	const weeks = data.collections.weeks

	if (weeks?.length) {
		let weekIndex = week - 1, unitIndex = weekIndex

		let date =
			(data.page.fileSlug === 'project' && data.date)
				? data.date // Override for “Index” project at end of semester.
				: weeks[weekIndex]?.data.date
		let weekOffset = 0

		let unit = data.unit

		while (!date && weekIndex > 0) {
			date = weeks[weekIndex - 1].data.date
			weekOffset++
			weekIndex--
		}

		if (date) {
			date = new Date(date)
			date.setDate(7 * weekOffset + date.getDate())
		}

		while (!unit && unitIndex > 0) {
			unit = weeks[unitIndex].data.unit
			unitIndex--
		}

		const unitNumber = new Set(
			weeks.slice(0, weekIndex + 1)
				.map((week) => unit = week.data.unit || unit)
				.filter(Boolean),
		).size

		return { date, unit, unitNumber }
	}
}

const isWeek = (data) => data.page.filePathStem.startsWith('/week/')
const isProject = (data) => data.page.filePathStem.startsWith('/project/')

export default {
	date: (data) => getWeek(data)?.date,
	title: (data) =>
		isWeek(data) ? `Week ${data.page.fileSlug}`
		: isProject(data) ? (Number.isInteger(+data.page.fileSlug)
			? `Project ${data.page.fileSlug}: “${data.markdownH1(data)}”`
			: `Project “${data.markdownH1(data)}”`)
		: data.markdownH1(data),
	unit: (data) => getWeek(data)?.unit,
	unitNumber: (data) => getWeek(data)?.unitNumber,
	week: (data) => isWeek(data) ? Number(data.page.fileSlug) : data.week,
}
