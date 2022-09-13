import propertytag from '#propertytag';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

function PROPERTYtag(...args) {
	return propertytag('PROPERTY', ...args);
}

test('object with property PROPERTY', function () {
	assert.is(PROPERTYtag`A${{ PROPERTY: 'B' }}C`, 'ABC');
});

test('object with property PROPERTY that is an empty string', function () {
	assert.is(PROPERTYtag`A${{ PROPERTY: '' }}C`, 'A[empty PROPERTY]C');
});

test('uses the value if the value has no property PROPERTY', function () {
	assert.is(PROPERTYtag`A${'B'}C`, 'ABC');
});

test.run();
