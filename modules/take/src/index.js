export default function take(n, values) {
	if (typeof n !== 'number') throw new TypeError(`not a number: ${n}`);
	if (typeof Object(values)[Symbol.iterator] !== 'function')
		throw new TypeError(`not values: ${values}`);
	return construct(n, values);
}

function* construct(n, values) {
	for (const value of values) {
		if (n-- <= 0) break;
		yield value;
	}
}
