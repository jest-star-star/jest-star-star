export default class Stack {
	#values = [];
	constructor(iterable = []) {
		for (const value of iterable) this.push(value);
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
