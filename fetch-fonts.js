// Until we package these properly, this gets our fonts from my private repo!

import 'dotenv/config'
import { mkdir, writeFile } from 'fs/promises'

const REPO = 'mfehrenbach/variable-mac-fonts'

const FONTS = ['geneva', 'new-york', 'monaco', 'chicago', 'venice']

const REF = process.env.FONTS_REF ?? 'main'
const TOKEN = process.env.GITHUB_TOKEN
const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}

const fetchFont = async (path, destination) => {
	const url = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${REF}`
	const res = await fetch(url, { headers })

	if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`)

	const { content } = await res.json()
	await writeFile(destination, Buffer.from(content, 'base64'))
	console.log(`✓ ${destination}`)
}

await mkdir('assets/fonts/cuts', { recursive: true })

for (const name of FONTS) {
	await fetchFont(`exports/web/${name}.woff2`, `assets/fonts/${name}.woff2`)
}


const cutsPath = 'exports/web/cuts'
const cutsUrl = `https://api.github.com/repos/${REPO}/contents/${cutsPath}?ref=${REF}`
const cutsRes = await fetch(cutsUrl, { headers })

if (!cutsRes.ok) throw new Error(`Failed to fetch ${cutsPath}: ${cutsRes.status} ${cutsRes.statusText}`)

for (const { name, path } of await cutsRes.json()) {
	if (FONTS.some((font) => name.startsWith(`${font}--`))) {
		await fetchFont(path, `assets/fonts/cuts/${name}`)
	}
}
