import nametag from '#nametag';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('named object', function () {
	assert.is(nametag`A${{ name: 'B' }}C`, 'ABC');
});

test.run();
