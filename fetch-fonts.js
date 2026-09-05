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

// Remap a character (e.g. U+0078 'x') in sfnt cmap table to a target glyph ID.
const remapCmap = (buffer, codePoint, glyphId) => {
	const buf = Buffer.from(buffer)
	let off = 12

	for (let i = 0; i < buf.readUInt16BE(4); i++, off += 16) {
		if (buf.toString('utf8', off, off + 4) !== 'cmap') continue
		const cmap = buf.readUInt32BE(off + 8)

		for (let j = 0; j < buf.readUInt16BE(cmap + 2); j++) {
			const sub = cmap + buf.readUInt32BE(cmap + 8 + j * 8)
			if (buf.readUInt16BE(sub) !== 4) continue

			const segCount = buf.readUInt16BE(sub + 6) / 2
			const endCodes = sub + 14
			const startCodes = endCodes + segCount * 2 + 2
			const deltas = startCodes + segCount * 2
			const offsets = deltas + segCount * 2

			for (let s = 0; s < segCount; s++) {
				const start = buf.readUInt16BE(startCodes + s * 2)
				const end = buf.readUInt16BE(endCodes + s * 2)
				if (codePoint < start || codePoint > end) continue

				const rangeOff = buf.readUInt16BE(offsets + s * 2)
				const delta = buf.readInt16BE(deltas + s * 2)

				rangeOff
					? buf.writeUInt16BE((glyphId - delta + 65536) % 65536, offsets + s * 2 + rangeOff + 2 * (codePoint - start))
					: buf.writeInt16BE((glyphId - codePoint + 65536) % 65536, deltas + s * 2)
			}
		}
		break
	}
	return buf
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
			.map((c) => c.opsz)
			.filter((v) => v !== undefined)
	)

	if (opszValues.size === 0) opszValues.add(parsed.variationAxes.opsz.default)

	for (const opsz of opszValues) {
		const outName = font.name.replace('.woff2', `--${opsz}.woff2`)
		const sfnt = await subsetFont(buffer, charset, { targetFormat: 'sfnt', variationAxes: { opsz } })
		const shapedXId = fontkit.create(sfnt).layout('x').glyphs[0]?.id
		const patched = shapedXId !== undefined ? remapCmap(sfnt, 120, shapedXId) : sfnt
		const instanced = await subsetFont(patched, charset, { targetFormat: 'woff2' })

		await writeFile(`assets/fonts/${outName}`, instanced)
		console.log(`✓ assets/fonts/${outName}`)
	}
}
