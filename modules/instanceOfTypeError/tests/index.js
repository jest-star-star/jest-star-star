import instanceOfTypeError from '#instanceOfTypeError';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('instanceOfTypeError', function () {
	assert.ok(instanceOfTypeError(new TypeError()));
});

test.run();
