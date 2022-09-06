export default class Queue {
	#values = [];
	constructor(values = []) {
		for (const value of values) this.push(value);
	}
	push(value) {
		this.#values.push(value);
		return this;
	}
	pop() {
		return this.#values.shift();
	}
	[Symbol.iterator]() {
		return this.#values[Symbol.iterator]();
	}
}
