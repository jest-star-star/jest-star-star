import Stack from '#Stack';
import Queue from '#Queue';

export default function fake(...outputs0) {
	let inputs = Stack.new();
	let outputs = Queue.new(outputs0);
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
