export default function* indexed(iterable, i = 0) {
	for (value of iterable) yield [value, i++, iterable];
}
