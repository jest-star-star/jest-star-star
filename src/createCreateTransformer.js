import createGetCacheKey from './createGetCacheKey.js';
import createProcess from './createProcess.js';

const { isArray } = Array;

export default function createCreateTransformer({
	nodeEnv,
	nodeVersion,
	transformSync,
	transformerId,
}) {
	const esbuildOptionsDefault = {
		format: 'cjs',
		sourcemap: 'both',
		target: `node${nodeVersion}`,
	};

	return createTransformer;

	function createTransformer(transformerOptions) {
		const [
			{ canInstrument = true, defineGetCacheKey = true },
			esbuildOptionsUser,
		] = normalize(transformerOptions);

		const esbuildOptions = {
			...esbuildOptionsDefault,
			...esbuildOptionsUser,
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
			esbuildOptions,
			nodeEnv,
			nodeVersion,
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

function normalize(options) {
	return isArray(options) ? options : [{}, options];
}
