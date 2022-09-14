import createTransformerFactory from '../src/createTransformerFactory.js';

import fake from '#fake';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('when given no arguments', () => {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	assert.is(transformer.canInstrument, true);
	assert.type(transformer.process, 'function');
	assert.match(transformer.getCacheKey(), /^[A-Za-z0-9]+$/u);
});

test('option canInstrument true', () => {
	const transformerFactory = createTransformerFactory();
	const { canInstrument } = transformerFactory.createTransformer([
		{ canInstrument: true },
	]);
	assert.is(canInstrument, true);
});

test('option canInstrument false', () => {
	const transformerFactory = createTransformerFactory();
	const { canInstrument } = transformerFactory.createTransformer([
		{ canInstrument: false },
	]);
	assert.is(canInstrument, false);
});

test('option defineGetCacheKey true', () => {
	const transformerFactory = createTransformerFactory();
	const { getCacheKey } = transformerFactory.createTransformer([
		{ defineGetCacheKey: true },
	]);
	assert.type(getCacheKey, 'function');
});

test('option defineGetCacheKey false', () => {
	const transformerFactory = createTransformerFactory();
	const { getCacheKey } = transformerFactory.createTransformer([
		{ defineGetCacheKey: false },
	]);
	assert.type(getCacheKey, 'undefined');
});

function testGetCacheKeyInput(description, invoke) {
	test(`same input same output for input ${description}`, function () {
		assert.is(invoke(true), invoke(true));
		assert.is(invoke(false), invoke(false));
	});
	test(`different input different output for input ${description}`, function () {
		assert.is.not(invoke(true), invoke(false));
	});
}
testGetCacheKeyInput('transformerId', function invoke(value) {
	const transformerFactory = createTransformerFactory({ transformerId: value });
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testGetCacheKeyInput('transformerConfigString', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer({
		OPTION: value,
	});
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testGetCacheKeyInput('transformerConfigString', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer([
		{},
		{ OPTION: value },
	]);
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testGetCacheKeyInput('sourceText', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(value);
	return cacheKey;
});
testGetCacheKeyInput('sourcePath', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(undefined, value);
	return cacheKey;
});
testGetCacheKeyInput('configString', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(undefined, undefined, {
		configString: value,
	});
	return cacheKey;
});
testGetCacheKeyInput('instrument', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(undefined, undefined, {
		instrument: value,
	});
	return cacheKey;
});
testGetCacheKeyInput('nodeEnv', function invoke(value) {
	const transformerFactory = createTransformerFactory({ nodeEnv: value });
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testGetCacheKeyInput('nodeVersion', function invoke(value) {
	const transformerFactory = createTransformerFactory({ nodeVersion: value });
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});

test('process', function () {
	const { FAKE: transformSync, args } = fake({
		EXTRA: 'STUFF',
		code: 'code',
		map: 'map',
	});
	const transformerFactory = createTransformerFactory({
		nodeVersion: '42',
		transformSync,
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

function testEsbuildOption(description, option) {
	test(`user can ${description} "${option}"`, function () {
		const { FAKE: transformSync, args } = fake({ code: 'code', map: 'map' });
		const transformerFactory = createTransformerFactory({ transformSync });
		const transformer = transformerFactory.createTransformer({
			[option]: 'VALUE',
		});
		assert.is(args().length, 0);
		transformer.process();
		assert.is(args().length, 1);
		const [, { [option]: value }] = args().at(0);
		assert.is(value, 'VALUE');
	});
	test(`user can ${description} "${option}"`, function () {
		const { FAKE: transformSync, args } = fake({ code: 'code', map: 'map' });
		const transformerFactory = createTransformerFactory({ transformSync });
		const transformer = transformerFactory.createTransformer([
			{},
			{ [option]: 'VALUE' },
		]);
		assert.is(args().length, 0);
		transformer.process();
		assert.is(args().length, 1);
		const [, { [option]: value }] = args().at(0);
		assert.is(value, 'VALUE');
	});
}
testEsbuildOption('override', 'format');
testEsbuildOption('override', 'sourcemap');
testEsbuildOption('override', 'target');
testEsbuildOption('set unknown', 'OPTION');

test('user can NOT override "sourcefile"', function () {
	const { FAKE: transformSync, args } = fake({ code: 'code', map: 'map' });
	const transformerFactory = createTransformerFactory({ transformSync });
	const transformer = transformerFactory.createTransformer({
		sourcefile: 'VALUE',
	});
	assert.is(args().length, 0);
	transformer.process();
	assert.is(args().length, 1);
	const [, { sourcefile }] = args().at(0);
	assert.is.not(sourcefile, 'VALUE');
});

test.run();
