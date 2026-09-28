import htmlPlugin from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'
import html from 'eslint-plugin-html'
import jsonc from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt()

// Code samples are content, not markup to lint — `map` is a `[start, end)` pair of zero-based lines.
const codeBlocks = (text) => markdown.parse(text, {})
	.filter(({ map, type }) => map && (type === 'code_block' || type === 'fence'))
	.map(({ map }) => map)

const reportedLine = ({ loc, node }) => (loc?.start ?? loc ?? node.loc.start).line

// Every `@html-eslint` rule, made blind to Markdown code blocks.
const markdownPlugin = {
	rules: Object.fromEntries(Object.entries(htmlPlugin.rules).map(([name, rule]) => [name, {
		...rule,
		create: (context) => {
			const blocks = codeBlocks(context.sourceCode.text)

			return rule.create(Object.create(context, {
				report: {
					value: (descriptor) => blocks.some(([start, end]) => reportedLine(descriptor) > start && reportedLine(descriptor) <= end) || context.report(descriptor),
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
		files: ['**/*.json'],
		languageOptions: { parser: (await import('jsonc-eslint-parser')).default },
		plugins: { jsonc },
		rules: {
			'jsonc/sort-keys': ['error', 'asc', { 'natural': true }],
		},
	},
	{
		files: ['**/*.html', '**/*.md', '**/*.webc'], // Common rules — `markdown/*` is `@html-eslint/*`, minus code blocks.
		languageOptions: { parser: htmlParser },
		plugins: { '@html-eslint': htmlPlugin, markdown: markdownPlugin },
		rules: {
			'indent': 'off', // Core `indent` throws on the HTML AST; `@html-eslint/indent` covers markup, `html/indent` covers scripts.
		},
	},
	{
		files: ['**/*.html', '**/*.webc'], // Examples and template/component-only.
		rules: prefixed('@html-eslint', { ...anyMarkupRules, ...wholeDocumentRules }),
	},
	{
		files: ['**/*.md'], // Just Markdown.
		rules: prefixed('markdown', { ...anyMarkupRules, 'prefer-https': 'warn' }),
	},
	{
		files: ['**/*.html'], // Examples read better in conventional attribute order.
		rules: { '@html-eslint/sort-attrs': 'off' },
	},
]
