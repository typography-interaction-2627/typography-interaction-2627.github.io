import beautify from 'js-beautify'
import { glob, readFile, writeFile } from 'node:fs/promises'

const options = {
	css: {
		space_around_combinator: true,
	},
	html: {
		extra_liners: [],
		indent_inner_html: true,
		// Subset we actually use, mainly to get `nobr` in there.
		inline: [
			'a', 'abbr', 'br', 'cite', 'code', 'em', 'kbd', 'nobr', 'samp', 'small', 'span', 'strong', 's', 'sub', 'sup', 'time',
		],
		preserve_newlines: false,
	},
	indent_with_tabs: true,
}

for (const [extension, formatter] of [['html', beautify.html], ['css', beautify.css], ['js', beautify.js]])
	for await (const file of glob(`_site/**/*.${extension}`)) {
		const contents = await readFile(file, 'utf8')
		// Cinch space introduced by `cite.webc` I think!
		const normalized = extension === 'html'
			? contents
				.replace(/(<a\b[^>]*>)\s*(<cite\b)/g, '$1$2')
				.replace(/(<\/cite>)\s*(<\/a>)/g, '$1$2')
			: contents

		await writeFile(file, formatter(normalized, options))
	}
