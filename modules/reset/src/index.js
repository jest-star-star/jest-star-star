export default function reset(property, object, value) {
	// throw `object does not have property: ${property}`;
	if (!Object.hasOwn(object, property)) return object;
	return Object.defineProperty(object, property, { value: value });
}
