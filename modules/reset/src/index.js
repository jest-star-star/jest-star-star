export default function reset(property, value, object) {
	if (!Object.hasOwn(object, property)) return object;
	return Object.defineProperty(object, property, { value: value });
}
