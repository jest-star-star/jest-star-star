import instanceOfTypeError from '#instanceOfTypeError';
import partial from '#partial';
import thunk from '#thunk';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('throws when not given a function', function () {
	assert.throws(thunk(partial, {}), instanceOfTypeError);
});

test('gives back a partial function application', function () {
	assert.is(partial(foo, 'a')('b'), 'ab');
	function foo(...args) {
		return args.join('');
	}
});

test.run();
