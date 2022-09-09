import instanceOfTypeError from '#instanceOfTypeError';
import rename from '#rename';
import thunk from '#thunk';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

function testNamed(description, produce) {
	test(`gives back a given ${description}`, function () {
		const object = produce();
		assert.is(rename('newname', object), object);
	});

	test(`renames a given ${description}`, function () {
		const object = produce();
		assert.is.not(object.name, 'newname');
		assert.is(rename('newname', object).name, 'newname');
	});
}

testNamed('anonymous function', function produce() {
	return function () {};
});

testNamed('named function', function produce() {
	return function oldname() {};
});

testNamed('named object', function produce() {
	return { name: 'oldname' };
});

test('throws when renaming a nameless object', function () {
	assert.throws(thunk(rename, 'newname', {}), instanceOfTypeError);
});

test.run();
