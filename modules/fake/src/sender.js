export default function sender(items) {
	return function send() {
		const item = items.shift();

		if (typeof item === 'function') {
			const result = item();

			// If item is a generator function,
			// then result will be an iterable.
			// That could be used to make a ring of outputs!
			// If result is an iterable, iterate over it!
			// What if an item is a generator function?

			return result;
		}

		return item;
	};
}
