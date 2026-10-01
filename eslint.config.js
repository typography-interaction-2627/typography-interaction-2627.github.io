import htmlPlugin from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'
import html from 'eslint-plugin-html'
import jsonc from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'
import * as jsoncParser from 'jsonc-eslint-parser'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt()

// Code samples are content, not markup to lint — but a fence’s own first line carries our attribute comments.
const codeBlocks = (text) => markdown.parse(text, {})
	.filter(({ map, type }) => map && (type === 'code_block' || type === 'fence'))
	.map(({ map: [start, end], type }) => type === 'fence' ? [start + 2, end - 1] : [start + 1, end])

const reportedLine = ({ loc, node }) => (loc?.start ?? loc ?? node.loc.start).line

// Ranked so `#id` leads, then `.class`, then attributes — each alphabetical.
const attrRank = (token) => token.startsWith('#') ? 0 : token.startsWith('.') ? 1 : 2

const sortTokens = (tokens) => [...tokens].sort((a, b) => attrRank(a) - attrRank(b) || a.localeCompare(b))

// No upstream rule sorts class *values*, only attribute names.
const sortClasses = {
	create: (context) => ({
		Attribute: (node) => {
			if (node.key.value.toLowerCase() !== 'class' || !node.value || node.value.parts?.length) return

			const classes = node.value.value.split(/\s+/).filter(Boolean)
			const sorted = [...classes].sort((a, b) => a.localeCompare(b))

			if (classes.join(' ') !== sorted.join(' ')) context.report({
				fix: (fixer) => fixer.replaceText(node.value, sorted.join(' ')),
				loc: node.value.loc,
				messageId: 'unsorted',
			})
		},
	}),
	meta: {
		fixable: 'code',
		messages: { unsorted: 'Class names should be sorted alphabetically.' },
		schema: [],
		type: 'code',
	},
}

const pageTitles = new Map()

// Duping examples leads to duped `title`.
const noDuplicatePageTitles = {
	create: (context) => ({
		Tag: (node) => {
			if (node.name !== 'head') return

			const title = node.children.find((child) => child.type === 'Tag' && child.name === 'title')
			const value = title?.children.filter((child) => child.type === 'Text')
				.map(({ value }) => value).join('').replace(/\s+/g, ' ').trim().toLowerCase()
			if (!value) return

			const duplicate = pageTitles.get(value)
			if (duplicate && duplicate !== context.filename) context.report({
				data: { duplicate },
				messageId: 'duplicate',
				node: title,
			})
			else pageTitles.set(value, context.filename)
		},
	}),
	meta: {
		messages: { duplicate: 'Page title duplicates {{duplicate}}.' },
		schema: [],
		type: 'problem',
	},
}

// Matches the shapes `commentsToCurlies` hands to `markdown-it-attrs` in `buildawesome.config.js`.
const sortAttrComments = {
	create: (context) => ({
		Comment: (node) => {
			const content = node.value?.value

			// `<!---` comments parse without a `value`.
			if (!content || !/^\s*([.#@:]|data|style|inert)/.test(content)) return

			const tokens = content.match(/(?:[^\s"]+|"[^"]*")+/g) ?? []
			const sorted = ` ${sortTokens(tokens).join(' ')} `

			if (content !== sorted) context.report({
				fix: (fixer) => fixer.replaceText(node.value, sorted),
				loc: node.value.loc,
				messageId: 'unsorted',
			})
		},
	}),
	meta: {
		fixable: 'code',
		messages: { unsorted: 'Attribute comment should be sorted, with single spaces.' },
		schema: [],
		type: 'code',
	},
}

const markupRules = { ...htmlPlugin.rules, 'sort-attr-comments': sortAttrComments, 'sort-classes': sortClasses }

const localPlugin = { rules: {
	'no-duplicate-page-titles': noDuplicatePageTitles,
	'sort-attr-comments': sortAttrComments,
	'sort-classes': sortClasses,
} }

// The same rules, made blind to Markdown code blocks.
const markdownPlugin = {
	rules: Object.fromEntries(Object.entries(markupRules).map(([name, rule]) => [name, {
		...rule,
		create: (context) => {
			const blocks = codeBlocks(context.sourceCode.text)

			return rule.create(Object.create(context, {
				report: {
					value: (descriptor) => blocks.some(([first, last]) => reportedLine(descriptor) >= first && reportedLine(descriptor) <= last) || context.report(descriptor),
				},
			}))
		},
	}])),
}

const prefixed = (plugin, rules) => Object.fromEntries(Object.entries(rules).map(([rule, setting]) => [`${plugin}/${rule}`, setting]))

const anyMarkupRules = { // Wherever markup appears: `.html`, `.md`, `.webc`.
	'class-spacing': 'error',
	'id-naming-convention': ['error', 'kebab-case'],
	'lowercase': 'error',
	'no-duplicate-attrs': 'error',
	'no-duplicate-class': 'error',
	'no-duplicate-id': 'error',
	'no-extra-spacing-attrs': ['error', { 'enforceBeforeSelfClose': true }],
	'no-invalid-entity': 'error',
	'no-multiple-empty-lines': ['error', { max: 1 }],
	'no-script-style-type': 'error',
	'no-trailing-spaces': 'error',
	'quotes': ['error', 'double'],
	'sort-attrs': ['error', {
		'priority': [
			{ 'pattern': 'webc:*' },
		],
	}],
}

const wholeDocumentRules = { // Only where we author the whole document, not fragments in prose.
	'element-newline': ['error', { 'inline': ['$inline', 'img', 'nobr', 'slot'] }],
	'indent': ['error', 'tab'],
	'no-nested-interactive': 'error',
	'prefer-https': 'error',
	'require-closing-tags': ['error', { 'selfClosing': 'never'}],
}

export default [
	{
		ignores: [
			'_site',
			'*package*',
			'node_modules',
		],
	},
	{
		plugins: {
			jsonc,
			perfectionist,
		},
	},
	{
		rules: {
			'arrow-parens': ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'indent': ['error', 'tab'],
			'no-console': 'warn',
			'perfectionist/sort-imports': ['error', {
				newlinesBetween: 'ignore',
				newlinesInside: 'ignore',
				order: 'asc',
				partitionByNewLine: true,
				type: 'natural',
			}],
			'perfectionist/sort-objects': ['error', {
				newlinesBetween: 'ignore',
				newlinesInside: 'ignore',
				order: 'asc',
				partitionByNewLine: true,
				type: 'natural',
			}],
			'prefer-const': 'error',
			'quotes': ['error', 'single'],
			'semi': ['error', 'never'],
		},
	},
	{
		files: ['**/*.html', '**/*.md', '**/*.webc'], // Extracts `script` contents for the core rules above.
		plugins: { html },
		settings: {
			'html/html-extensions': ['.html', '.md', '.webc'],
			'html/indent': '+tab',
			'html/report-bad-indent': 'warn',
		},
	},
	{
		files: ['**/*.json', '.vscode/*.json'],
		languageOptions: { parser: jsoncParser },
		plugins: { jsonc },
		rules: {
			'jsonc/sort-keys': ['error', 'asc', { 'natural': true }],
		},
	},
	{
		files: ['**/*.html', '**/*.md', '**/*.webc'], // Common rules — `markdown/*` is `@html-eslint/*`, minus code blocks.
		languageOptions: { parser: htmlParser },
		plugins: { '@html-eslint': htmlPlugin, local: localPlugin, markdown: markdownPlugin }, // `eslint-plugin-html` finds `@html-eslint` by identity, so it has to stay registered.
		rules: {
			'indent': 'off', // Core `indent` throws on the HTML AST; `@html-eslint/indent` covers markup, `html/indent` covers scripts.
		},
	},
	{
		files: ['**/*.html', '**/*.webc'], // Examples and template/component-only.
		rules: { ...prefixed('@html-eslint', { ...anyMarkupRules, ...wholeDocumentRules }), 'local/sort-classes': 'error' },
	},
	{
		files: ['**/*.md'], // Just Markdown.
		rules: prefixed('markdown', { ...anyMarkupRules, 'prefer-https': 'warn', 'sort-attr-comments': 'error', 'sort-classes': 'error' }),
	},
	{
		files: ['**/*.html'], // Examples read better in conventional attribute order.
		rules: {
			'@html-eslint/require-title': 'error',
			'@html-eslint/sort-attrs': 'off',
			'local/no-duplicate-page-titles': 'error',
		},
	},
]
