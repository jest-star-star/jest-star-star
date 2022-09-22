import each from '#each';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('each', function () {
	for (const [value, index] of each([0, 1, 2]))
		assert.is(value, index);
});

test.run();
