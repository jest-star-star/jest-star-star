export default function indexed(iterable, i = 0) {
	const iterator = iterable[Symbol.iterator]();
	return {
		next() {
			const { done, value } = iterator.next();
			return { done, value: done ? undefined : [value, i++, iterable] };
		},
	};
}
