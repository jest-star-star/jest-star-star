import createCreateTransformer from './createCreateTransformer.js';

export default function createTransformerFactory({
	nodeEnv,
	nodeVersion,
	transformSync,
	transformerId,
} = {}) {
	const createTransformer = createCreateTransformer({
		nodeEnv,
		nodeVersion,
		transformSync,
		transformerId,
	});

	const transformerFactory = {
		createTransformer,
	};

	return transformerFactory;
}
