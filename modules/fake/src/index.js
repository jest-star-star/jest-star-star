import Stack from '#Stack';
import Queue from '#Queue';

export default function fake(...outputs0) {
	let inputs = new Stack();
	let outputs = new Queue(outputs0);
	return [FAKE, args];
	function FAKE(...input) {
		inputs = inputs.push(input);
		const [result] = outputs;
		outputs = outputs.dequeue();
		return result;
	}
	function args() {
		return inputs;
	}
}
