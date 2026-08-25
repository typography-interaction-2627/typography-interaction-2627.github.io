// Count up our dates and units.
const getWeek = (data) => {
	const week = data.week || data.page.fileSlug
	const weeks = data.collections.weeks

	if (weeks?.length) {
		let weekIndex = week - 1, unitIndex = weekIndex

		let date = data.page.filePathStem.includes('topic')
			? undefined // No date for topics.
			: (data.page.fileSlug === 'project' && data.date)
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

const types = ['week', 'topic', 'project']
const getType = page => types.find(type => page.inputPath.includes(`/${type}/`))

const getSequence = data => [
	...data.collections.root,
	...types.flatMap(type => data.collections[`${type}s`]).sort((a, b) =>
		(a.data.week || Infinity) - (b.data.week || Infinity)
		|| types.indexOf(getType(a)) - types.indexOf(getType(b))
		|| a.data.order - b.data.order
	)
]

const inCollection = (data, name) => data.collections[name]?.some((item) => item.inputPath === data.page.inputPath)

// Allow in-Markdown `title` via H1.
const getH1 = (data) => (data.page.rawInput.match(/^# (.+)/m)?.[1].trim() || data.title)

export default {
	date:       (data) => getWeek(data)?.date,
	sequence:   (data) => getSequence(data).findIndex(page => page.inputPath === data.page.inputPath),
	title:      (data) => inCollection(data, 'weeks')
					? `Week ${data.page.fileSlug}`
					: inCollection(data, 'projects')
						? (Number.isInteger(+data.page.fileSlug)
							? `Project ${data.page.fileSlug}: <em>${getH1(data)}</em>`
							: `Project <em>${getH1(data)}</em>`)
						: getH1(data),
	unit:       (data) => getWeek(data)?.unit,
	unitNumber: (data) => getWeek(data)?.unitNumber,
	week:       (data) => inCollection(data, 'weeks')
					? Number(data.page.fileSlug)
					: data.week,
}
