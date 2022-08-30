import rename from '#rename';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

for (const object of [
	{},
	{ name: 'oldname' },
	function () {},
	function oldname() {},
]) {
	test('returns the passed-in object', function () {
		assert.is(rename('newname', object), object);
	});
}

test('renames a named function', function () {
	assert.is(rename('newname', oldname).name, 'newname');
	function oldname() {}
});

test('renames an anonymous function', function () {
	assert.is(rename('newname', function () {}).name, 'newname');
});

test('renames a named object', function () {
	assert.is(rename('newname', { name: 'name' }).name, 'newname');
});

test('does name a nameless object', function () {
	assert.is(rename('newname', {}).name, undefined);
});

test.run();
