import hashsum from '#hashsum';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('nullary', function () {
	const nullary = hashsum();
	assert.is.not(nullary, '');
	assert.is(hashsum(), nullary);
	assert.is(hashsum([]), nullary);
	assert.is.not(hashsum(['']), nullary);
	assert.is.not(hashsum(['a']), nullary);
});

test('same input same output', function () {
	assert.is(hashsum(['a']), hashsum(['a']));
	assert.is(hashsum(['b']), hashsum(['b']));
	assert.is(hashsum(['a', 'b']), hashsum(['a', 'b']));
});

test('different input different output', function () {
	assert.is.not(hashsum(['a']), hashsum(['b']));
	assert.is.not(hashsum(['a', 'b']), hashsum(['a', 'c']));
});

test.run();
