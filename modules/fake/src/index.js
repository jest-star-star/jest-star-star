import Stack from '#Stack';
import Queue from '#Queue';

export default function fake(...outputs0) {
	let inputs = new Stack();
	let outputs = new Queue(outputs0);
	return [FAKE, args];
	// function* FAKE(...input) {
	function FAKE(...input) {
		// while () {
		// }
		inputs = inputs.push(input);
		const [result] = outputs;
		// Is this where to process functions and generator functions?
		outputs = outputs.dequeue();
		return result;
	}
	function args() {
		return inputs;
	}
}
