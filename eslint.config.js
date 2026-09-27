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
		files: ['**/*.json'],
		languageOptions: { parser: (await import('jsonc-eslint-parser')).default },
		plugins: { jsonc },
		rules: {
			'jsonc/sort-keys': ['error', 'asc', { 'natural': true }],
		},
	},
]
