import Stack from '#Stack';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('push pop', function () {
	const stack = new Stack();
	assert.is(stack.pop(), undefined);
	stack.push(1);
	stack.push(2);
	stack.push(3);
	assert.is(stack.pop(), 3);
	assert.is(stack.pop(), 2);
	assert.is(stack.pop(), 1);
	assert.is(stack.pop(), undefined);
});

test('iterator', function () {
	const stack = new Stack();
	assert.equal([...stack], []);
	stack.push(1);
	assert.equal([...stack], [1]);
	stack.push(2);
	assert.equal([...stack], [2, 1]);
	stack.push(3);
	assert.equal([...stack], [3, 2, 1]);
	stack.pop();
	assert.equal([...stack], [2, 1]);
	stack.pop();
	assert.equal([...stack], [1]);
	stack.pop();
	assert.equal([...stack], []);
});

test('constructor', function () {
	const stack = new Stack([1, 2, 3]);
	assert.equal([...stack], [3, 2, 1]);
	assert.is(stack.pop(), 3);
	assert.equal([...stack], [2, 1]);
	assert.is(stack.pop(), 2);
	assert.equal([...stack], [1]);
	assert.is(stack.pop(), 1);
	assert.equal([...stack], []);
	assert.is(stack.pop(), undefined);
});

test.run();
