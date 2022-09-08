import take from '#take';
import thunk from '#thunk';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('validates first argument is a number', function () {
	assert.throws(thunk(take, {}, []));
});

test('validates second argument is iterable', function () {
	assert.throws(thunk(take, 1, 1));
});

test('take(i, upto(j))', function () {
	const n = 5;
	for (let i = 0; i < n; i++)
		for (let j = 0; j < n; j++) {
			const min = Math.min(i, j);
			assert.equal([...take(i, upto(j))], [...upto(min)]);
			assert.equal([...take(i, [...upto(j)])], [...upto(min)]);
		}
});

function* upto(n) {
	for (let i = 1; i <= n; i++) yield i;
}

test('upto', function () {
	assert.equal([...upto(0)], []);
	assert.equal([...upto(1)], [1]);
	assert.equal([...upto(2)], [1, 2]);
	assert.equal([...upto(3)], [1, 2, 3]);
});

// Add a test to ensure that the iterable is opened and closed?

test.run();
