import fake from '#fake';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('fake(); FAKE();', function () {
	const [FAKE, args] = fake();
	assert.throws(FAKE());
	assert.throws(FAKE());
	assert.throws(FAKE());
});

test('fake(X); FAKE();', function () {
	const [FAKE, args] = fake(1);
	assert.is(FAKE(), 1);
	assert.throws(FAKE());
	assert.throws(FAKE());
});

test('fake(X, X); FAKE();', function () {
	const [FAKE, args] = fake(1, 2);
	assert.is(FAKE(), 1);
	assert.is(FAKE(), 2);
	assert.throws(FAKE());
});

test('fake(X, X, X); FAKE();', function () {
	const [FAKE, args] = fake(1, 2, 3);
	assert.is(FAKE(), 1);
	assert.is(FAKE(), 2);
	assert.is(FAKE(), 3);
});

test('fake(FUNCTION); FAKE();', function () {
	const [FAKE, args] = fake(FUNCTION);
	assert.is(FAKE(), 1);
	function FUNCTION() {
		return 1;
	}
});

test('fake(); args();', function () {
	const [FAKE, args] = fake();
	assert.equal(args(), []);
	FAKE(1);
	assert.equal(args(), [[1]]);
	FAKE(2);
	assert.equal(args(), [[2], [1]]);
	FAKE(3);
	assert.equal(args(), [[3], [2], [1]]);
});

test('fake(); args(INVALID);', function () {
	const [FAKE, args] = fake();
	assert.throws(args(''));
	assert.throws(args('X'));
	assert.throws(args(-0));
	assert.throws(args(-1));
	assert.throws(args(NaN));
	assert.throws(args(Symbol()));
	assert.throws(args(false));
	assert.throws(args(FUNCTION));
	assert.throws(args(null));
	assert.throws(args(true));
	assert.throws(args({}));
	function FUNCTION() {}
});

test('fake(); args(N);', function () {
	const [FAKE, args] = fake();
	assert.throws(args(0));
	FAKE(1);
	assert.equal(args(0), [1]);
	assert.throws(args(1));
	FAKE(2);
	assert.equal(args(0), [2]);
	assert.equal(args(1), [1]);
	assert.throws(args(2));
	FAKE(3);
	assert.equal(args(0), [3]);
	assert.equal(args(1), [2]);
	assert.equal(args(2), [1]);
	assert.throws(args(3));
});

test.run();
