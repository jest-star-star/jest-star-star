export default function throws(value) {
	return function THROWS() {
		throw value;
	};
}
