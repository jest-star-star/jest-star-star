module.exports = {
	cache: false,
	cacheDirectory: '_build/jest/cache',
	collectCoverage: true,
	collectCoverageFrom: ['**/*.js', '!**/*.test.js', '!_build/**'],
	coverageDirectory: '_build/jest/coverage',
	coverageProvider: 'v8',
	testMatch: ['**/*.test.js'],
	transform: { '\\.js$': '<rootDir>/mini-transformer' },
};
