export default function apply(fn, ...args1) {
	if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
	return function APPLY(...args2) {
		return fn(...args1, ...args2);
	};
}
