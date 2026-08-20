import 'dotenv/config'
import { mkdir, writeFile } from 'fs/promises'

const REPO = 'mfehrenbach/variable-mac-fonts'

const FONTS = [
	{ name: 'geneva.woff2', path: 'exports/web/geneva.woff2' },
	{ name: 'new-york.woff2', path: 'exports/web/new-york.woff2' },
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
