import identity from '#identity';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('identity', function () {
	assert.is(identity(1, 2), 1);
});

test.run();
