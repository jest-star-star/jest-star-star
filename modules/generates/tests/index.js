import generates from '#generates';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('gives back the specified value', function () {
	const generator = generates()();
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
});

test('gives back 1 value', function () {
	const generator = generates([1])();
	assert.is(generator.next().value, 1);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
});

test('gives back 2 values', function () {
	const generator = generates([1, 2])();
	assert.is(generator.next().value, 1);
	assert.is(generator.next().value, 2);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
});

test('gives back 3 values', function () {
	const generator = generates([1, 2, 3])();
	assert.is(generator.next().value, 1);
	assert.is(generator.next().value, 2);
	assert.is(generator.next().value, 3);
	assert.is(generator.next().value, undefined);
	assert.is(generator.next().value, undefined);
});

test.run();
