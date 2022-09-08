export default function take(n, iterable) {
	if (typeof n !== 'number') throw new TypeError(`not a number: ${n}`);
	if (typeof Object(iterable)[Symbol.iterator] !== 'function')
		throw new TypeError(`not iterable: ${iterable}`);
	return TAKE(n, iterable);
}

function* TAKE(n, iterable) {
	for (const value of iterable) {
		if (n-- <= 0) break;
		yield value;
	}
}
