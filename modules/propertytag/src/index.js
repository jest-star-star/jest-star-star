export default function propertytag(property, [first, ...strings], ...values) {
	return values.reduce(join, first);
	function join(result, value, i) {
		return result + substitute(value) + strings[i];
	}
	function substitute(value) {
		if (Object.hasOwn(value, property)) {
			const result = `${value[property]}`;
			if (result === '') return `[empty ${property}]`;
			return result;
		}
		return `${value}`;
	}
}
