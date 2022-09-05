import fake from '#fake';
import partial from '#partial';
import returns from '#returns';
import throws from '#throws';
import thunk from '#thunk';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

// function that returns an array, vs generator that yields: basically the same.

test('args() when FAKE()*', function () {
	const { FAKE, args } = fake();
	assert.equal(args(), []);
	FAKE();
	assert.equal(args(), [[]]);
	FAKE();
	assert.equal(args(), [[], []]);
	FAKE();
	assert.equal(args(), [[], [], []]);
	FAKE();
	assert.equal(args(), [[], [], [], []]);
	FAKE();
	assert.equal(args(), [[], [], [], [], []]);
});

test('args() when FAKE(i++)*;', function () {
	const { FAKE, args } = fake();
	assert.equal(args(), []);
	FAKE(1);
	assert.equal(args(), [[1]]);
	FAKE(2);
	assert.equal(args(), [[2], [1]]);
	FAKE(3);
	assert.equal(args(), [[3], [2], [1]]);
	FAKE(4);
	assert.equal(args(), [[4], [3], [2], [1]]);
	FAKE(5);
	assert.equal(args(), [[5], [4], [3], [2], [1]]);
});

function testNone(description, invoke) {
	test(`FAKE()* === undefined* when ${description}`, function () {
		const { FAKE } = invoke();
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
	});
}

function testOne(description, invoke) {
	test(`FAKE()* === 1,undefined* when ${description}`, function () {
		const { FAKE, args } = invoke();
		assert.is(FAKE(), 1);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
	});
}

function testOneTwo(description, invoke) {
	test(`FAKE()* === 1,2,undefined* when ${description}`, function () {
		const { FAKE, args } = invoke();
		assert.is(FAKE(), 1);
		assert.is(FAKE(), 2);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
	});
}

function testOneTwoThree(description, invoke) {
	test(`FAKE()* === 1,2,3,undefined* when ${description}`, function () {
		const { FAKE, args } = invoke();
		assert.is(FAKE(), 1);
		assert.is(FAKE(), 2);
		assert.is(FAKE(), 3);
		assert.is(FAKE(), undefined);
		assert.is(FAKE(), undefined);
	});
}

testNone('fake()', thunk(fake));
testOne('fake(1)', thunk(fake, 1));
testOneTwo('fake(1, 2)', thunk(fake, 1, 2));
testOneTwoThree('fake(1, 2, 3)', thunk(fake, 1, 2, 3));

testNone('fake()', thunk(fake));
testOne('fake(returns(1))', thunk(fake, returns(1)));
testOneTwo('fake(returns(1), returns(2))', thunk(fake, returns(1), returns(2)));
testOneTwoThree(
	'fake(returns(1), returns(2), returns(3))',
	thunk(fake, returns(1), returns(2), returns(3)),
);

test('FAKE() throws when fake(throws("1")', function () {
	const { FAKE, args } = fake(throws('1'));
	assert.throws(thunk(FAKE), '1');
});

test.run();

// ////////
//
// test = suite('fake: basics: generator');
//
// test('fake(Generator); FAKE();', function () {
// 	const generator = GENERATOR_FUNCTION();
// 	const [FAKE, args] = fake(generator);
// 	assert.is(FAKE(), 1);
// 	assert.is(FAKE(), 2);
// 	assert.is(FAKE(), 3);
// 	function* GENERATOR_FUNCTION() {
// 		yield 1;
// 		yield 2;
// 		yield 3;
// 	}
// });
//
// test('fake(Generator that throws); FAKE();', function () {
// 	const generator = GENERATOR_FUNCTION();
// 	const [FAKE, args] = fake(generator);
// 	assert.throws(thunk(FAKE), '1');
// 	function* GENERATOR_FUNCTION() {
// 		throw '1';
// 	}
// });
//
// test.run();
//
// ////////
//
// test = suite('fake: when exhausted');
//
//
// test.run();
//
// ////////
//
// test = suite('fake: ');
//
// test('fake(GENERATOR_FUNCTION); FAKE();', function () {
// 	const [FAKE, args] = fake(GENERATOR_FUNCTION);
// 	assert.not.throws(thunk(FAKE));
// 	assert.throws(thunk(FAKE));
// 	function* GENERATOR_FUNCTION() {
// 		yield 1;
// 	}
// });
//
// test('fake(THROWING_GENERATOR_FUNCTION *); FAKE();', function () {
// 	const [FAKE, args] = fake(THROWING_GENERATOR_FUNCTION);
// 	assert.throws(thunk(FAKE), 'thrown');
// 	function* THROWING_GENERATOR_FUNCTION() {
// 		throw 'thrown';
// 	}
// });
//
// test('fake(); args();', function () {
// 	const [FAKE, args] = fake();
// 	assert.equal(args(), []);
// 	FAKE(1);
// 	assert.equal(args(), [[1]]);
// 	FAKE(2);
// 	assert.equal(args(), [[2], [1]]);
// 	FAKE(3);
// 	assert.equal(args(), [[3], [2], [1]]);
// });
//
// // test('fake(); args(INVALID);', function () {
// // 	const [FAKE, args] = fake();
// // 	assert.throws(thunk(args, ''));
// // 	assert.throws(thunk(args, 'X'));
// // 	assert.throws(thunk(args, -0));
// // 	assert.throws(thunk(args, -1));
// // 	assert.throws(thunk(args, NaN));
// // 	assert.throws(thunk(args, Symbol()));
// // 	assert.throws(thunk(args, false));
// // 	assert.throws(thunk(args, FUNCTION));
// // 	assert.throws(thunk(args, null));
// // 	assert.throws(thunk(args, true));
// // 	assert.throws(thunk(args, {}));
// // 	function FUNCTION() {}
// // });
//
// test('fake(); args(I < N);', function () {
// 	const [FAKE, args] = fake();
// 	FAKE(1);
// 	assert.equal(args(0), [1]);
// 	FAKE(2);
// 	assert.equal(args(0), [2]);
// 	assert.equal(args(1), [1]);
// 	FAKE(3);
// 	assert.equal(args(0), [3]);
// 	assert.equal(args(1), [2]);
// 	assert.equal(args(2), [1]);
// });
//
// test('fake(); args(N < I);', function () {
// 	const [FAKE, args] = fake();
// 	assert.throws(thunk(args, 0));
// 	assert.throws(thunk(args, 1));
// 	assert.throws(thunk(args, 2));
// 	FAKE();
// 	assert.not.throws(thunk(args, 0));
// 	assert.throws(thunk(args, 1));
// 	assert.throws(thunk(args, 2));
// 	FAKE();
// 	assert.not.throws(thunk(args, 0));
// 	assert.not.throws(thunk(args, 1));
// 	assert.throws(thunk(args, 2));
// 	FAKE();
// 	assert.not.throws(thunk(args, 0));
// 	assert.not.throws(thunk(args, 1));
// 	assert.not.throws(thunk(args, 2));
// });
//
// test.run();
