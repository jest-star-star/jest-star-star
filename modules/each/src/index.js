export default function each(iterable, i = 0) {
	const iterator = iterable[Symbol.iterator]();
	return {
		next(...args) {
			const { done, value } = iterator.next(...args);
			if (done) return { done, value };
			return { value: [value, i++, iterable] };
		},
		return: iterator.return.bind(iterator),
		throw: iterator.throw.bind(iterator),
	};
}
