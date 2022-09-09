import seq from '#seq';
import thunk from '#thunk';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('validates first argument is a number', function () {
	assert.throws(thunk(seq, {}));
});

test('validates second argument is a number', function () {
	assert.throws(thunk(seq, 1, {}));
});

test('seq()', function () {
	let n = 5;
	let i = 1;
	for (const value of seq()) {
		assert.is(value, i);
		i += 1;
		if (--n <= 0) break;
	}
});

test('seq(1)', function () {
	let n = 5;
	let i = 1;
	for (const value of seq(1)) {
		assert.is(value, i);
		i += 1;
		if (--n <= 0) break;
	}
});

test('seq(1, 1)', function () {
	let n = 5;
	let i = 1;
	for (const value of seq(1, 1)) {
		assert.is(value, i);
		i += 1;
		if (--n <= 0) break;
	}
});

test('seq(1, 2)', function () {
	let n = 5;
	let i = 1;
	for (const value of seq(1, 2)) {
		assert.is(value, i);
		i += 2;
		if (--n <= 0) break;
	}
});

test('seq(2)', function () {
	let n = 5;
	let i = 2;
	for (const value of seq(2)) {
		assert.is(value, i);
		i += 1;
		if (--n <= 0) break;
	}
});

test('seq(2, 1)', function () {
	let n = 5;
	let i = 2;
	for (const value of seq(2, 1)) {
		assert.is(value, i);
		i += 1;
		if (--n <= 0) break;
	}
});

test('seq(2, 2)', function () {
	let n = 5;
	let i = 2;
	for (const value of seq(2, 2)) {
		assert.is(value, i);
		i += 2;
		if (--n <= 0) break;
	}
});

test.run();
