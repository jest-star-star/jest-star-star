// Maybe `partial` can call `fn.bind(null, ...)` to trigger the TypeError.
// Test the difference in `this` when calling the bound function.

export default function partial(fn, ...args1) {
	if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
	return function APPLY(...args2) {
		return fn(...args1, ...args2);
	};
}
