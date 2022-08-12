import createTransformerFactory from '../src/createTransformerFactory.js';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('when given no arguments', () => {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();

	assert.is(transformer.canInstrument, true);
	assert.type(transformer.getCacheKey, 'function');
	assert.type(transformer.process, 'function');
});

test.run();
