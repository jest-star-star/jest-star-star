import target from './target.js';
import writeId from './writeId.js';

import { build } from 'esbuild';

await build({
	bundle: true,
	entryPoints: ['src/index.js'],
	external: ['esbuild', '#transformerId'],
	format: 'esm',
	outfile: '_build/index.js',
	platform: 'node',
});

await writeId({
	infile: '_build/index.js',
	outfile: '_build/transformerId.js',
});

await build({
	bundle: true,
	entryPoints: ['src/index.js'],
	external: ['esbuild'],
	format: 'esm',
	outfile: '_build/dist/import/index.js',
	platform: 'node',
	sourcemap: true,
	target,
});

await build({
	bundle: true,
	entryPoints: ['src/index.js'],
	external: ['esbuild'],
	outfile: '_build/dist/require/index.js',
	platform: 'node',
	sourcemap: true,
	target,
});
