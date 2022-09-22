import instanceOf from '#instanceOf';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('instanceOf', function () {
	const A = function() {};
	const a = new A();
	assert.ok(instanceOf(A, a));
});

test.run();
