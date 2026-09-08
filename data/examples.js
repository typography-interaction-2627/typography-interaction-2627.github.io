import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Find all examples for all topics, and construct a nested map of all file contents for use in
 * rendering of interactive example live demo page.
 *
 * @note this does not support nested folders in the examples themselves
 */

/**
 * @typedef {string} Topic
 * @typedef {string} Example
 * @typedef {string} FileName
 * @typedef {string} FileContents
 */

/**
 * @type {Record<Topic, Record<Example, Record<FileName, FileContents>>>}
 */
const data = {}

const topicRoot = './content/topic'
const entries = await readdir(topicRoot, { recursive: true, withFileTypes: true })

// Only files at least 2 levels deep (topic/example/filename), matching the old `*/*/**` glob
const files = entries
	.filter(entry => entry.isFile())
	.map(entry => path.join(path.relative(topicRoot, entry.parentPath), entry.name))
	.filter(relativePath => relativePath.split(path.sep).length >= 3)

for (const file of files) {
	const parts = file.split(path.sep)

	const topic = parts[0]
	const example = parts[1]
	const filename = parts[2]

	data[topic] = {
		...(data[topic] ?? {}),
		[example]: {
			...(data[topic]?.[example] ?? {}),
			[filename]: await readFile(path.join(topicRoot, file), 'utf8'),
		},
	}
}

/** @type {{ topic: Topic, example: Example, files: { filename: FileName, contents: FileContents }[] }[] }[]} */
const output = []

// Convert nested object to arrays for better ergonomics in-template
Object.entries(data).forEach(([topic, examples]) => {
	Object.entries(examples).forEach(([example, files]) => {
		output.push({
			example,
			files: Object.entries(files).map(([filename, contents]) => ({
				contents,
				filename,
			})),
			topic,
		})
	})
})

export default output
