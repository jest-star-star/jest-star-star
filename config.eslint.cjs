module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
	root: true,
};

// {
//   "rules": {
//     "no-tabs": ["error", {"allowIndentationTabs": true}]
//   }
// }
