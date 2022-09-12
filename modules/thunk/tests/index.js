import instanceOfTypeError from '#instanceOfTypeError';
import thunk from '#thunk';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('throws when not given a function', function () {
	assert.throws(invoke, instanceOfTypeError);
	function invoke() {
		thunk({});
	}
});

test('calls the wrapped function', function () {
	assert.equal(thunk(FUNCTION)(), []);
	assert.equal(thunk(FUNCTION)(), []);
	assert.equal(thunk(FUNCTION, 1)(), [1]);
	function FUNCTION(...args) {
		return args;
	}
});

test('ignores extra arguments', function () {
	assert.equal(thunk(FUNCTION)('ignored'), []);
	assert.equal(thunk(FUNCTION)('ignored'), []);
	assert.equal(thunk(FUNCTION, 1)('ignored'), [1]);
	function FUNCTION(...args) {
		return args;
	}
});

test.run();
