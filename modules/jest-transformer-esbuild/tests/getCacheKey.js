import createTransformerFactory from '../src/createTransformerFactory.js';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('when given no arguments', () => {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	assert.match(cacheKey, /^[A-Za-z0-9]+$/u);
});

function testInput(description, invoke) {
	test(`same input same output for input ${description}`, function () {
		assert.is(invoke(true), invoke(true));
		assert.is(invoke(false), invoke(false));
	});
	test(`different input different output for input ${description}`, function () {
		assert.is.not(invoke(true), invoke(false));
	});
}
testInput('transformerId', function invoke(value) {
	const transformerFactory = createTransformerFactory({ transformerId: value });
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testInput('transformerConfigString', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer({
		foo: value,
	});
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testInput('sourceText', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(value);
	return cacheKey;
});
testInput('sourcePath', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(undefined, value);
	return cacheKey;
});
testInput('configString', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(undefined, undefined, {
		configString: value,
	});
	return cacheKey;
});
testInput('instrumentString', function invoke(value) {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey(undefined, undefined, {
		instrument: value,
	});
	return cacheKey;
});
testInput('nodeEnv', function invoke(value) {
	const transformerFactory = createTransformerFactory({ nodeEnv: value });
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});
testInput('nodeVersion', function invoke(value) {
	const transformerFactory = createTransformerFactory({ nodeVersion: value });
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	return cacheKey;
});

test.run();
