import nametag from '#nametag';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('named object', function () {
	assert.is(nametag`A${{ name: 'B' }}C`, 'ABC');
});

test('uses the value if the value has no name', function () {
	assert.is(nametag`A${'B'}C`, 'ABC');
});

test('empty string named object', function () {
	assert.is(nametag`A${{ name: '' }}C`, 'A[empty name]C');
});

test.run();
