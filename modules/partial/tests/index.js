import { test } from 'uvu';
import * as assert from 'uvu/assert';

// if calling the unwrapped bound function
// results in a throw like:
//
//     partial({})(); // same as: ({})();
//     Uncaught TypeError: {} is not a function
//
// then try to throw something (the same thing?) at the call to partial.

test.run();
