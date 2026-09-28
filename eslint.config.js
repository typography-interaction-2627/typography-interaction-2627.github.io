import htmlPlugin from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'
import html from 'eslint-plugin-html'
import jsonc from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'

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
		files: ['**/*.html', '**/*.md', '**/*.webc'], // Common rules.
		languageOptions: { parser: htmlParser },
		plugins: { '@html-eslint': htmlPlugin },
		rules: {
			'@html-eslint/id-naming-convention': ['error', 'kebab-case'],
			'@html-eslint/lowercase': 'error',
			'@html-eslint/no-duplicate-attrs': 'error',
			'@html-eslint/no-duplicate-class': 'error',
			'@html-eslint/no-duplicate-id': 'error',
			'@html-eslint/no-extra-spacing-attrs': ['error', { 'enforceBeforeSelfClose': true }],
			'@html-eslint/no-invalid-entity': 'error',
			'@html-eslint/no-multiple-empty-lines': ['error', { max: 1 }],
			'@html-eslint/no-script-style-type': 'error',
			'@html-eslint/no-trailing-spaces': 'error',
			'@html-eslint/quotes': ['error', 'double'],
			'indent': 'off', // Core `indent` throws on the HTML AST; `@html-eslint/indent` covers markup, `html/indent` covers scripts.
		},
	},
	{
		files: ['**/*.html', '**/*.webc'], // Examples and template/component-only.
		languageOptions: { parser: htmlParser },
		plugins: { '@html-eslint': htmlPlugin },
		rules: {
			'@html-eslint/element-newline': ['error', { 'inline': ['$inline', 'img', 'nobr', 'slot'] }],
			'@html-eslint/indent': ['error', 'tab'],
			'@html-eslint/no-nested-interactive': 'error',
			'@html-eslint/prefer-https': 'error',
			'@html-eslint/require-closing-tags': ['error', { 'selfClosing': 'never'}],
		},
	},
	{
		files: ['**/*.webc'], // Template/component-only.
		languageOptions: { parser: htmlParser },
		plugins: { '@html-eslint': htmlPlugin },
		rules: {
			'@html-eslint/attrs-newline': ['error', { 'closeStyle': 'newline', 'ifAttrsMoreThan': 3 }],
			'@html-eslint/sort-attrs': ['error', {
				'priority': [
					{ 'pattern': 'webc:*' },
				],
			}],
		},
	},
	{
		files: ['**/*.md'], // Just Markdown.
		languageOptions: { parser: htmlParser },
		plugins: { '@html-eslint': htmlPlugin },
		rules: {
			'@html-eslint/prefer-https': 'warn',
		},
	},
]
