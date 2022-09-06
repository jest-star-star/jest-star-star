export default class Stack {
	#values = [];
	constructor(values = []) {
		for (const value of values) this.push(value);
	}
	push(value) {
		this.#values.unshift(value);
		return this;
	}
	pop() {
		return this.#values.shift();
	}
	[Symbol.iterator]() {
		return this.#values[Symbol.iterator]();
	}
}
