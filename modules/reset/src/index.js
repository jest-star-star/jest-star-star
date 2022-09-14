export default function reset(property, value, object) {
	if (!Object.hasOwn(object, property))
		throw new TypeError(`object must have property "${property}"`);
	return Object.defineProperty(object, property, { value });
}
