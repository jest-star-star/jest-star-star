import createTransformerFactory from './createTransformerFactory.js';

import TRANSFORMER_ID from '#transformerId';

import ESBUILD from 'esbuild';

import PROCESS from 'node:process';

export default createTransformerFactory({
	nodeEnv: PROCESS.env.NODE_ENV,
	nodeVersion: PROCESS.versions.node,
	transformSync: ESBUILD.transformSync,
	transformerId: TRANSFORMER_ID,
});
