import createGetCacheKey from './createGetCacheKey.js';
import createProcess from './createProcess.js';

export default function createCreateTransformer({
	nodeEnv,
	nodeVersion,
	transformSync,
	transformerId,
}) {
	const defaultEsbuildOptions = {
		format: 'cjs',
		sourcemap: 'both',
		target: `node${nodeVersion}`,
	};

	return createTransformer;

	function createTransformer(transformerOptions) {
		const [
			{ canInstrument = true, defineGetCacheKey = true },
			userEsbuildOptions,
		] = normalize(transformerOptions);

		const esbuildOptions = {
			...defaultEsbuildOptions,
			...userEsbuildOptions,
		};

		const process = createProcess({
			esbuildOptions,
			transformSync,
		});

		if (!defineGetCacheKey) {
			const transformer = {
				canInstrument,
				process,
			};

			return transformer;
		}

		const getCacheKey = createGetCacheKey({
			nodeEnv,
			nodeVersion,
			esbuildOptions,
			transformerId,
		});

		const transformer = {
			canInstrument,
			getCacheKey,
			process,
		};

		return transformer;
	}
}

function normalize(transformerOptions) {
	return [{}, transformerOptions];
}
