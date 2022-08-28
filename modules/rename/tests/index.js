import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('renames a function', function () {
	assert.is(rename(FUNCTION, 'function').name, 'function');
	function FUNCTION() {}
});

test('renames a function', function () {
	Object.defineProperty(FUNCTION, 'name', { value: 'foo' });
	assert.is(FUNCTION.name, 'foo');

	// writableness changed by defineProperty?
	FUNCTION.name = 'bar';

	assert.is(FUNCTION.name, 'bar');
	assert.is(FUNCTION.name, 'foo');
	function FUNCTION() {}
});

test('does not rename an object', function () {
	assert.is(rename({}, 'object').name, undefined);
	assert.is(rename({ name: 'name' }, 'object').name, 'name');
});

test.run();
