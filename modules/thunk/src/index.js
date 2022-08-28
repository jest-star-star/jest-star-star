export default function thunk(fn, args = []) {
	return function THUNK() {
		return fn(...args);
	};
}
