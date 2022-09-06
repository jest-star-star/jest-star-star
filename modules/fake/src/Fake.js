import Queue from '#Queue';
import Stack from '#Stack';

export default class Fake {
	#inputs = new Stack();
	#outputs = new Queue();
	constructor(outputs = []) {
		for (const output of outputs) this.#outputs.push(output);
	}
	call(input) {
		this.#inputs.push(input);
		const output = this.#outputs.pop();
		if (typeof output === 'function') return output();
		else return output;
	}
	[Symbol.iterator]() {
		return this.#inputs[Symbol.iterator]();
	}
}
