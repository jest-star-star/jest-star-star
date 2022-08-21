import fake from '#fake';

// import { test } from 'uvu';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

let test;

////////

function thunk(fn, args = []) {
	return function THUNK() {
		return fn(...args);
	};
}

test = suite('thunk');

test('calls the wrapped function', function () {
	assert.equal(thunk(FUNCTION)(), []);
	assert.equal(thunk(FUNCTION, [])(), []);
	assert.equal(thunk(FUNCTION, [1])(), [1]);
	function FUNCTION(...args) {
		return args;
	}
});

test('ignores extra arguments', function () {
	assert.equal(thunk(FUNCTION)('ignored'), []);
	assert.equal(thunk(FUNCTION, [])('ignored'), []);
	assert.equal(thunk(FUNCTION, [1])('ignored'), [1]);
	function FUNCTION(...args) {
		return args;
	}
});

test.run();

////////

function returns(value) {
	return function RETURNS() {
		return value;
	};
}

test = suite('returns');

test('returns the specified value', function () {
	assert.is(returns()(), undefined);
	assert.is(returns(1)(), 1);
});

test.run();

////////

function throws(value) {
	return function THROWS() {
		throw value;
	};
}

test = suite('throws');

test('returns', function () {
	assert.throws(throws('1'), '1');
	assert.throws(throws('2'), '2');
	assert.throws(throws('3'), '3');
});

test.run();

////////

// function toString(fn, name) {
// 	if (typeof fn !== 'function') throw 'not a function';
// 	Object.defineProperty(fn, "name", { value: name });
// 	fn.toString = function toString() { return name; };
// 	return fn;
// }

function toString(fn, name) {
	if (typeof fn !== 'function') throw 'not a function';
	fn.toString = toString;
	return fn;
	function toString() {
		return name;
	}
}

test = suite('toString');

test('returns the same function', function () {
	assert.is(toString(FN, 'FUNCTION'), FN);
	function FN() {}
});

// test('returns the same function', function () {
// 	assert.is(toString(FN, 'FUNCTION'), function FN() {});
// });

// test('changes the .name value', function () {
// 	assert.is(FN.name, 'FN');
// 	toString(FN, 'FUNCTION');
// 	assert.is(FN.name, 'FUNCTION');
// 	function FN() {}
// });

test('changes the string interpolation value', function () {
	toString(FN, 'FUNCTION');
	assert.is(`${FN}`, 'FUNCTION');
	function FN() {}
});

test('only works on functions', function () {
	assert.throws(thunk(toString, [{}, 'FUNCTION']), 'not a function');
});

test.run();

////////

test = suite('fake: basics');

for (const [one, two, three] of [
	[1, 2, 3],
	[
		toString(returns(1), 'ONE'),
		toString(returns(2), 'TWO'),
		toString(returns(3), 'THREE'),
	],
]) {
	test(`fake(${one}); FAKE();`, function () {
		const [FAKE, args] = fake(one);
		assert.is(FAKE(), 1);
	});

	test(`fake(${one}, ${two}); FAKE();`, function () {
		const [FAKE, args] = fake(one, two);
		assert.is(FAKE(), 1);
		assert.is(FAKE(), 2);
	});

	test(`fake(${one}, ${two}, ${three}); FAKE();`, function () {
		const [FAKE, args] = fake(one, two, three);
		assert.is(FAKE(), 1);
		assert.is(FAKE(), 2);
		assert.is(FAKE(), 3);
	});
}

test('fake(THROWS); FAKE();', function () {
	const [FAKE, args] = fake(throws('1'));
	assert.throws(thunk(FAKE), '1');
});

test.run();

////////

test = suite('fake: basics: generator');

test('fake(Generator); FAKE();', function () {
	const [FAKE, args] = fake(
		(function* () {
			yield 1;
			yield 2;
			yield 3;
		})(),
	);
	assert.is(FAKE(), 1);
	assert.is(FAKE(), 2);
	assert.is(FAKE(), 3);
});

test('fake(Generator that throws); FAKE();', function () {
	const [FAKE, args] = fake(
		(function* () {
			throw '1';
		})(),
	);
	assert.throws(thunk(FAKE), '1');
});

test.run();

////////

test = suite('fake: when exhausted');

test('fake(); FAKE();', function () {
	const [FAKE, args] = fake();
	assert.throws(thunk(FAKE));
	assert.throws(thunk(FAKE));
	assert.throws(thunk(FAKE));
});

test('fake(X); FAKE();', function () {
	const [FAKE, args] = fake(1);
	assert.not.throws(thunk(FAKE));
	assert.throws(thunk(FAKE));
	assert.throws(thunk(FAKE));
});

test('fake(X, X); FAKE();', function () {
	const [FAKE, args] = fake(1, 2);
	assert.not.throws(thunk(FAKE));
	assert.not.throws(thunk(FAKE));
	assert.throws(thunk(FAKE));
});

test('fake(X, X, X); FAKE();', function () {
	const [FAKE, args] = fake(1, 2, 3);
	assert.not.throws(thunk(FAKE));
	assert.not.throws(thunk(FAKE));
	assert.not.throws(thunk(FAKE));
});

test.run();

////////

test = suite('fake: ');

test('fake(FUNCTION); FAKE();', function () {
	const [FAKE, args] = fake(returns(1));
	assert.not.throws(thunk(FAKE));
	assert.throws(thunk(FAKE));
});

test('fake(THROWING_FUNCTION); FAKE();', function () {
	const [FAKE, args] = fake(THROWING_FUNCTION);
	assert.throws(thunk(FAKE), 'thrown');
	function THROWING_FUNCTION() {
		throw 'thrown';
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

// test('fake(); args(INVALID);', function () {
// 	const [FAKE, args] = fake();
// 	assert.throws(thunk(args, ['']));
// 	assert.throws(thunk(args, ['X']));
// 	assert.throws(thunk(args, [-0]));
// 	assert.throws(thunk(args, [-1]));
// 	assert.throws(thunk(args, [NaN]));
// 	assert.throws(thunk(args, [Symbol()]));
// 	assert.throws(thunk(args, [false]));
// 	assert.throws(thunk(args, [FUNCTION]));
// 	assert.throws(thunk(args, [null]));
// 	assert.throws(thunk(args, [true]));
// 	assert.throws(thunk(args, [{}]));
// 	function FUNCTION() {}
// });

test('fake(); args(I < N);', function () {
	const [FAKE, args] = fake();
	FAKE(1);
	assert.equal(args(0), [1]);
	FAKE(2);
	assert.equal(args(0), [2]);
	assert.equal(args(1), [1]);
	FAKE(3);
	assert.equal(args(0), [3]);
	assert.equal(args(1), [2]);
	assert.equal(args(2), [1]);
});

test('fake(); args(N < I);', function () {
	const [FAKE, args] = fake();
	assert.throws(thunk(args, [0]));
	assert.throws(thunk(args, [1]));
	assert.throws(thunk(args, [2]));
	FAKE();
	assert.not.throws(thunk(args, [0]));
	assert.throws(thunk(args, [1]));
	assert.throws(thunk(args, [2]));
	FAKE();
	assert.not.throws(thunk(args, [0]));
	assert.not.throws(thunk(args, [1]));
	assert.throws(thunk(args, [2]));
	FAKE();
	assert.not.throws(thunk(args, [0]));
	assert.not.throws(thunk(args, [1]));
	assert.not.throws(thunk(args, [2]));
});

test.run();
