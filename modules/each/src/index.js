export default function each(values, i = 0) {
	const original = values[Symbol.iterator]();
	return augment(
		{
			next(...args) {
				const { done, value } = original.next(...args);
				if (done) return { done, value };
				return { value: [value, i++, values] };
			},
			[Symbol.iterator]() {
				return this;
			},
			// Define `return` and `throw` here?
			// `original = null;`?  No.
			// Well, use a state machine?
		},
		original,
	);
}

// Write tests to prove that checking is necessary.
function augment(iterator, original) {
	bind(iterator, original, 'return');
	bind(iterator, original, 'throw');
	return iterator;
}

function bind(iterator, original, property) {
	const fn = original[property];
	if (typeof fn === 'function') iterator[property] = fn.bind(original);
}
