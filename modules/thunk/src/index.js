export default function thunk(fn, ...args) {
	if (typeof fn !== 'function')
		throw new TypeError('first argument must be a function');
	return function THUNK() {
		return fn(...args);
	};
}

// export default rename('thunk', sequence(ensure, thunk));
//
// function thunk(fn, ...args) {
// 	return function THUNK() {
// 		return fn(...args);
// 	};
// }
//
// function ensure(...args) {
// 	if (typeof args[0] !== 'function')
// 		throw new TypeError('first argument must be a function');
// }
//
// function sequence(...fns) {
// 	for (const fn of fns)
// 		if (typeof fn !== 'function)
// 			throw new TypeError('all arguments must be functions');
// 	return function SEQUENCE(...args) {
// 		let result;
// 		for (const fn of fns)
// 			result = fn(...args);
// 		return result;
// 	}
// }
//
// isFunctionTypeOfArgument0 = partial(partial(is, 'function'), partial(typeOf, partial(at, 0)));
//
// function is(value1, value2) {
// 	return value1 === value2;
// }
//
// function typeOf(value) {
// 	return typeof value;
// }
//
// function at(i, a) {
// 	return a[i];
// }
//
// function at(i, iterable) {
// 	if (i < 0) throw new TypeError('must not be negative');
// 	for (const value of iterable) if (i-- === 0) return value;
// }
//
// // If no obvious order for partial, then delegate to function?
//
// function ensureTypeOfNthArgumentIs(type, i, fn) {
// 	return function ASSERT_TYPE_OF_NTH_ARGUMENT_IS(...args) {
// 		const arg = args[i];
// 		if (typeof arg !== type)
// 			throw new TypeError(`${arg} is not a ${type}`);
// 		return fn(...args);
// 	};
// }
//
// // ensureFunctionIsTypeOfFirstArgument
// // ensureIsTypeOfFirstArgumentFunction
// // ensureTypeOfFirstArgumentIsFunction
// // ensureFirstArgumentIsTypeOfFunction
//
// function ensure(fn, test) {
// 	return function ENSURE(...args) {
// 		test(...args);
// 		return fn(...args);
// }
//
// function ensure(fn, test, message) {
// 	return function ENSURE(...args) {
// 		if (!test(...args))
// 			throw new TypeError(message(...args));
// 		return fn(...args);
// }
