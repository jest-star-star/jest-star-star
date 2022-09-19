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
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/modules/*/tests/*.js',
					'**/modules/build/src/*.js',
				],
				optionalDependencies: false,
			},
		],
		'import/no-unresolved': ['error', { ignore: ['^#'] }],
		'import/order': [
			'error',
			{
				'alphabetize': { order: 'asc' },
				'groups': [
					'index',
					'sibling',
					'parent',
					'internal',
					'unknown',
					'external',
					'builtin',
					'type',
					'object',
				],
				'newlines-between': 'always',
			},
		],
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
