import throws from '#throws';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('returns', function () {
	assert.throws(throws('1'), '1');
	assert.throws(throws('2'), '2');
	assert.throws(throws('3'), '3');
});

test.run();
