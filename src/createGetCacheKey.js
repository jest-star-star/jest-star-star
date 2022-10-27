import hashsum from '#hashsum';

const { stringify } = JSON;

export default function createGetCacheKey({
	esbuildOptions,
	nodeEnv,
	nodeVersion,
	transformerId,
}) {
	const transformerConfigString = stringify(esbuildOptions);

	return getCacheKey;

	function getCacheKey(
		sourceText,
		sourcePath,
		{ configString, instrument } = {},
	) {
		// Verify rootDir is in configString
		const instrumentString = instrument ? 'instrument' : '';
		const items = [
			transformerId,
			transformerConfigString,
			sourceText,
			sourcePath,
			configString,
			instrumentString,
			nodeEnv,
			nodeVersion,
		];
		const sum = hashsum(items);

		return sum;
	}
}
