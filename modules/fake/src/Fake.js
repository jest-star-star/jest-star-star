import Queue from '#Queue';
import Stack from '#Stack';

export default class Fake {
	#inputs = new Stack();
	#outputs = new Queue();
	constructor(iterable = []) {
		for (const value of iterable) this.#outputs.push(value);
	}
	call(args) {
		this.#inputs.push(args);
		const output = this.#outputs.pop();
		if (typeof output === 'function') return output();
		else return output;
	}
	[Symbol.iterator]() {
		return this.#inputs[Symbol.iterator]();
	}
}
