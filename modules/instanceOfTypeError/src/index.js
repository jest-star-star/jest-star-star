import instanceOf from '#instanceOf';

export default function instanceOfTypeError(...args) {
	return instanceOf(TypeError, ...args);
}
