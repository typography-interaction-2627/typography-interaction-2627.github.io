import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

// Group example files by `topic/example` — only files 2 levels deep, no nested example folders.
const topicRoot = './content/topic'
const groups = {}

for (const entry of await readdir(topicRoot, { recursive: true, withFileTypes: true })) {
	if (!entry.isFile() || entry.name.startsWith('.')) continue

	const relative = path.relative(topicRoot, path.join(entry.parentPath, entry.name))
	const [topic, example, filename] = relative.split(path.sep)
	if (!filename) continue

	const group = groups[`${topic}/${example}`] ??= { example, paths: [], topic }
	group.paths.push(relative)
}

// Read every file concurrently, then swap each group's `paths` for resolved `files`.
const output = await Promise.all(Object.values(groups).map(async ({ paths, ...group }) => ({
	...group,
	files: await Promise.all(paths.map(async relative => ({
		contents: await readFile(path.join(topicRoot, relative), 'utf8'),
		filename: path.basename(relative),
	}))),
})))

export default output
