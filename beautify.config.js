import beautify from 'js-beautify'
import { glob, readFile, writeFile } from 'node:fs/promises'

const options = {
	css: {
		space_around_combinator: true,
	},
	html: {
		indent_inner_html: true,
		preserve_newlines: false,
	},
	indent_with_tabs: true,
}

for (const [extension, formatter] of [['html', beautify.html], ['css', beautify.css], ['js', beautify.js]])
	for await (const file of glob(`_site/**/*.${extension}`))
		await writeFile(file, formatter(await readFile(file, 'utf8'), options))
