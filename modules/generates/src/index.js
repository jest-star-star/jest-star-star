export default function generates(...values) {
	return function* GENERATES() {
		for (const value of values) yield value;
	};
}
