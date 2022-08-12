import fake from '#fake';

import createTransformerFactory from '../src/createTransformerFactory.js';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('when given esbuild.transformSync', function () {
	const [transformSync, { args, count }] = fake({
		code: 'code',
		map: 'map',
		extra: 'stuff',
	});
	const transformerFactory = createTransformerFactory({
		transformSync,
		nodeVersion: '42',
	});
	const transformer = transformerFactory.createTransformer();

	assert.is(count(), 0);
	const transformedSource = transformer.process('sourceText', 'sourcePath');
	assert.is(count(), 1);

	assert.equal(args(), [
		'sourceText',
		{
			format: 'cjs',
			sourcefile: 'sourcePath',
			sourcemap: 'both',
			target: 'node42',
		},
	]);

	assert.equal(transformedSource, { code: 'code', map: 'map' });
});

test('when given esbuild options', function () {
	const [transformSync, { args, count }] = fake({
		code: 'code',
		map: 'map',
	});
	const transformerFactory = createTransformerFactory({ transformSync });
	const transformer = transformerFactory.createTransformer({ foo: 'bar' });

	assert.is(count(), 0);
	transformer.process();
	assert.is(count(), 1);

	const [, { foo }] = args();

	assert.is(foo, 'bar');
});

for (const option of ['format', 'sourcemap', 'target']) {
	test(`user can override \`${option}\``, function () {
		const [transformSync, { args, count }] = fake({
			code: 'code',
			map: 'map',
		});
		const transformerFactory = createTransformerFactory({ transformSync });
		const transformer = transformerFactory.createTransformer({
			[option]: 'foo',
		});

		assert.is(count(), 0);
		transformer.process();
		assert.is(count(), 1);

		const [, { [option]: value }] = args();

		assert.is(value, 'foo');
	});
}

test('user can NOT override `sourcefile`', function () {
	const [transformSync, { args, count }] = fake({
		code: 'code',
		map: 'map',
	});
	const transformerFactory = createTransformerFactory({ transformSync });
	const transformer = transformerFactory.createTransformer({
		sourcefile: 'foo',
	});

	assert.is(count(), 0);
	transformer.process();
	assert.is(count(), 1);

	const [, { sourcefile }] = args();

	assert.is.not(sourcefile, 'foo');
});

test.run();
