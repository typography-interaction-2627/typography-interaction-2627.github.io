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

const getMarkdownTitle = (data) =>
	data.page.rawInput.match(/^# (.+)/m)?.[1].trim() || data.title

export default {
	date: (data) => getWeek(data)?.date,
	title: (data) => getMarkdownTitle(data),
	unit: (data) => getWeek(data)?.unit,
	unitNumber: (data) => getWeek(data)?.unitNumber,
}
