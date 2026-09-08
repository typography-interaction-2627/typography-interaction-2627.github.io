import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Find all examples for all topics, and construct a nested map of all file contents for use in
 * rendering of interactive example live demo page.
 *
 * @note this does not support nested folders in the examples themselves
 */

const topicRoot = './content/topic'

// Only files at least 2 levels deep (topic/example/filename), matching the old `*/*/**` glob
const files = (await readdir(topicRoot, { recursive: true, withFileTypes: true }))
	.filter(entry => entry.isFile() && !entry.name.startsWith('.'))
	.map(entry => path.relative(topicRoot, path.join(entry.parentPath, entry.name)))
	.filter(relativePath => relativePath.split(path.sep).length >= 3)

const items = await Promise.all(files.map(async file => {
	const [topic, example] = file.split(path.sep)

	return { contents: await readFile(path.join(topicRoot, file), 'utf8'), example, filename: path.basename(file), topic }
}))

const output = Object.values(Object.groupBy(items, ({ topic, example }) => `${topic}/${example}`))
	.map(group => ({
		example: group[0].example,
		files: group.map(({ filename, contents }) => ({ contents, filename })),
		topic: group[0].topic,
	}))

export default output
