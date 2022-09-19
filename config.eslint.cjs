'use strict';

module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['airbnb-base', 'prettier'],
	overrides: [
		{
			files: ['**/*.cjs'],
			parserOptions: {
				sourceType: 'script',
			},
			rules: {
				strict: ['error', 'global'],
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	root: true,
	rules: {
		'func-names': 'off',
		'import/extensions': 'off',
		'import/no-duplicates': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'import/order': 'off',
		'lines-between-class-members': 'off',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-restricted-syntax': 'off',
		'no-shadow': 'off',
		'no-use-before-define': 'off',
		'prefer-arrow-callback': 'off',
		'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
	},
};
