import nth from './nth.js';
import receiver from './receiver.js';
import sender from './sender.js';

const { from: all } = Array;

export default function fake(...outputs) {
	const output = sender(outputs);
	const [receive, inputs] = receiver();
	return [FAKE, args];

	function FAKE(...input) {
		receive(input);
		return output();
	}

	function args(n) {
		const items = inputs();
		return n === undefined ? all(items) : nth(items, n);
	}
}
