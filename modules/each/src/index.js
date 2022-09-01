export default function each(iterable, i = 0) {
	const iterator = iterable[Symbol.iterator]();
	return {
		next() {
			const { done, value } = iterator.next();
			if (done) return { done, value };
			return { value: [value, i++, iterable] };
		},
	};
}
