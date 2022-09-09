export default function generates(iterable = []) {
	return function* GENERATES() {
		for (const value of iterable) yield value;
	};
}
