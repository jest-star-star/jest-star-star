export default function thunk(fn, ...args) {
	if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
	return function THUNK() {
		return fn(...args);
	};
}
