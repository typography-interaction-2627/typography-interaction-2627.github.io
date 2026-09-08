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

const output = await Promise.all(
	Object.entries(Object.groupBy(files, file => file.split(path.sep, 2).join(path.sep)))
		.map(async ([key, group]) => {
			const [topic, example] = key.split(path.sep)

			return {
				example,
				files: await Promise.all(group.map(async file => ({
					contents: await readFile(path.join(topicRoot, file), 'utf8'),
					filename: path.basename(file),
				}))),
				topic,
			}
		}),
)

export default output
