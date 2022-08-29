export default function partial(fn, ...args1) {
	if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
	return function PARTIAL(...args2) {
		return fn(...args1, ...args2);
	};
}
