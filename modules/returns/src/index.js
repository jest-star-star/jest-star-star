export default function returns(value) {
	return function RETURNS() {
		return value;
	};
}
