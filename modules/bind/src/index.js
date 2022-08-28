export default function bind(fn, ...args1) {
	// if (typeof fn !=== 'function') throw 'not a function';
	return function BIND(...args2) {
		return fn(...args1, ...args2);
	};
}
