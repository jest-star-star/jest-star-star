import returns from '#returns';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('returns the specified value', function () {
	assert.is(returns()(), undefined);
	assert.is(returns(1)(), 1);
});

test.run();
