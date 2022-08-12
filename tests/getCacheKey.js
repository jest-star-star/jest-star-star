import createTransformerFactory from '../src/createTransformerFactory.js';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('when given no arguments', () => {
	const transformerFactory = createTransformerFactory();
	const transformer = transformerFactory.createTransformer();
	const cacheKey = transformer.getCacheKey();
	assert.match(cacheKey, /^[A-Za-z0-9]{32}$/u);
});

// Test same nodeEnv, etc. values lead to same cacheKey values.
// Test different nodeEnv, etc. values lead to different cacheKey values.

test.run();
