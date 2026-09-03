// Until we package these properly, this gets our fonts from my private repo!

import 'dotenv/config'
import { mkdir, readFile, writeFile } from 'fs/promises'
import subsetFont from 'subset-font'
import * as fontkit from 'fontkit'

const REPO = 'mfehrenbach/variable-mac-fonts'

const FONTS = [
	{ name: 'geneva.woff2', path: 'exports/web/geneva.woff2' },
	{ name: 'new-york.woff2', path: 'exports/web/new-york.woff2' },
	{ name: 'monaco.woff2', path: 'exports/web/monaco.woff2' },
	{ name: 'chicago.woff2', path: 'exports/web/chicago.woff2' },
	{ name: 'venice.woff2', path: 'exports/web/venice.woff2' },
]

const REF = process.env.FONTS_REF ?? 'main'
const TOKEN = process.env.GITHUB_TOKEN
const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}

await mkdir('assets/fonts', { recursive: true })

for (const font of FONTS) {
	const url = `https://api.github.com/repos/${REPO}/contents/${font.path}?ref=${REF}`
	const res = await fetch(url, { headers })

	if (!res.ok) throw new Error(`Failed to fetch ${font.name}: ${res.status} ${res.statusText}`)

	const { content } = await res.json()
	await writeFile(`assets/fonts/${font.name}`, Buffer.from(content, 'base64'))

	console.log(`✓ assets/fonts/${font.name}`)
}

// Separate strike files for each `opsz` until Chrome gets its act together:
// https://issues.chromium.org/issues/505751224
for (const font of FONTS) {
	const buffer = await readFile(`assets/fonts/${font.name}`)
	const parsed = fontkit.create(buffer)
	const charset = String.fromCodePoint(...parsed.characterSet)

	if (!parsed.variationAxes.opsz) {
		console.log(`– ${font.name} has no opsz axis, skipping instancing`)
		continue
	}

	const opszValues = new Set(
		Object.values(parsed.namedVariations)
			.map((coords) => coords.opsz)
			.filter((v) => v !== undefined)
	)

	if (opszValues.size === 0) opszValues.add(parsed.variationAxes.opsz.default)

	for (const opsz of opszValues) {
		const outName = font.name.replace('.woff2', `--${opsz}.woff2`)
		const instanced = await subsetFont(buffer, charset, {
			targetFormat: 'woff2',
			variationAxes: { opsz },
		})
		await writeFile(`assets/fonts/${outName}`, instanced)
		console.log(`✓ assets/fonts/${outName}`)
	}
}
