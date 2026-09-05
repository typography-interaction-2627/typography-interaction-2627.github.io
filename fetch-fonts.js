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

const remapCodePoint = (buffer, codePoint, newGlyphId) => {
	const buf = Buffer.from(buffer)
	const numTables = buf.readUInt16BE(4)
	let cmapOffset = 0

	for (let i = 0; i < numTables; i++) {
		const recOffset = 12 + i * 16
		if (buf.toString('utf8', recOffset, recOffset + 4) === 'cmap') {
			cmapOffset = buf.readUInt32BE(recOffset + 8)
			break
		}
	}

	const numCmapSubtables = buf.readUInt16BE(cmapOffset + 2)

	for (let i = 0; i < numCmapSubtables; i++) {
		const subRecOffset = cmapOffset + 4 + i * 8
		const subtableOffset = cmapOffset + buf.readUInt32BE(subRecOffset + 4)

		if (buf.readUInt16BE(subtableOffset) === 4) {
			const segCount = buf.readUInt16BE(subtableOffset + 6) / 2
			const endCodeOffset = subtableOffset + 14
			const startCodeOffset = endCodeOffset + segCount * 2 + 2
			const idDeltaOffset = startCodeOffset + segCount * 2
			const idRangeOffsetOffset = idDeltaOffset + segCount * 2

			for (let s = 0; s < segCount; s++) {
				const start = buf.readUInt16BE(startCodeOffset + s * 2)
				const end = buf.readUInt16BE(endCodeOffset + s * 2)

				if (codePoint >= start && codePoint <= end) {
					const idDelta = buf.readInt16BE(idDeltaOffset + s * 2)
					const idRangeOffset = buf.readUInt16BE(idRangeOffsetOffset + s * 2)

					if (idRangeOffset !== 0) {
						const glyphPtr = idRangeOffsetOffset + s * 2 + idRangeOffset + 2 * (codePoint - start)
						buf.writeUInt16BE((newGlyphId - idDelta + 65536) % 65536, glyphPtr)
					} else {
						const newDelta = (newGlyphId - codePoint + 65536) % 65536
						buf.writeInt16BE(newDelta > 32767 ? newDelta - 65536 : newDelta, idDeltaOffset + s * 2)
					}
				}
			}
		}
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
			.map((coords) => coords.opsz)
			.filter((v) => v !== undefined)
	)

	if (opszValues.size === 0) opszValues.add(parsed.variationAxes.opsz.default)

	for (const opsz of opszValues) {
		const outName = font.name.replace('.woff2', `--${opsz}.woff2`)
		const sfntBuffer = await subsetFont(buffer, charset, {
			targetFormat: 'sfnt',
			variationAxes: { opsz },
		})

		const instancedFont = fontkit.create(sfntBuffer)
		const shapedXGlyphId = instancedFont.layout('x').glyphs[0]?.id

		const patchedSfnt = shapedXGlyphId !== undefined
			? remapCodePoint(sfntBuffer, 120, shapedXGlyphId)
			: sfntBuffer

		const instanced = await subsetFont(patchedSfnt, charset, {
			targetFormat: 'woff2',
		})

		await writeFile(`assets/fonts/${outName}`, instanced)
		console.log(`✓ assets/fonts/${outName}`)
	}
}
