import fake from '#fake';

import createTransformerFactory from '../src/createTransformerFactory.js';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('when given esbuild.transformSync', function () {
	const { FAKE: transformSync, args } = fake({
		code: 'code',
		map: 'map',
		extra: 'stuff',
	});
	const transformerFactory = createTransformerFactory({
		transformSync,
		nodeVersion: '42',
	});
	const transformer = transformerFactory.createTransformer();

	assert.is(args().length, 0);
	const transformedSource = transformer.process('sourceText', 'sourcePath');
	assert.is(args().length, 1);

	assert.equal(args()[0], [
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
	const { FAKE: transformSync, args } = fake({ code: 'code', map: 'map' });
	const transformerFactory = createTransformerFactory({ transformSync });
	const transformer = transformerFactory.createTransformer({ foo: 'bar' });

	assert.is(args().length, 0);
	transformer.process();
	assert.is(args().length, 1);

	const [, { foo }] = args()[0];

	assert.is(foo, 'bar');
});

function testOptionOverride(option) {
	test(`user can override \`${option}\``, function () {
		const { FAKE: transformSync, args } = fake({ code: 'code', map: 'map' });
		const transformerFactory = createTransformerFactory({ transformSync });
		const transformer = transformerFactory.createTransformer({
			[option]: 'foo',
		});

		assert.is(args().length, 0);
		transformer.process();
		assert.is(args().length, 1);

		const [, { [option]: value }] = args()[0];

		assert.is(value, 'foo');
	});
}
testOptionOverride('format');
testOptionOverride('sourcemap');
testOptionOverride('target');

test('user can NOT override `sourcefile`', function () {
	const { FAKE: transformSync, args } = fake({ code: 'code', map: 'map' });
	const transformerFactory = createTransformerFactory({ transformSync });
	const transformer = transformerFactory.createTransformer({
		sourcefile: 'foo',
	});

	assert.is(args().length, 0);
	transformer.process();
	assert.is(args().length, 1);

	const [, { sourcefile }] = args()[0];

	assert.is.not(sourcefile, 'foo');
});

test.run();
