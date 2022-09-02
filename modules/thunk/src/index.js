export default function thunk(fn, ...args) {
	if (typeof fn !== 'function')
		throw new TypeError('first argument must be a function');
	return function THUNK() {
		return fn(...args);
	};
}
