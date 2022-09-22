import Queue from '#Queue';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('push pop', function () {
	const queue = new Queue();
	assert.is(queue.pop(), undefined);
	queue.push(1);
	queue.push(2);
	queue.push(3);
	assert.is(queue.pop(), 1);
	assert.is(queue.pop(), 2);
	assert.is(queue.pop(), 3);
	assert.is(queue.pop(), undefined);
});

test('iterator', function () {
	const queue = new Queue();
	assert.equal([...queue], []);
	queue.push(1);
	assert.equal([...queue], [1]);
	queue.push(2);
	assert.equal([...queue], [1, 2]);
	queue.push(3);
	assert.equal([...queue], [1, 2, 3]);
	queue.pop();
	assert.equal([...queue], [2, 3]);
	queue.pop();
	assert.equal([...queue], [3]);
	queue.pop();
	assert.equal([...queue], []);
});

test('constructor', function () {
	const queue = new Queue([1, 2, 3]);
	assert.equal([...queue], [1, 2, 3]);
	assert.is(queue.pop(), 1);
	assert.equal([...queue], [2, 3]);
	assert.is(queue.pop(), 2);
	assert.equal([...queue], [3]);
	assert.is(queue.pop(), 3);
	assert.equal([...queue], []);
	assert.is(queue.pop(), undefined);
});

test.run();
