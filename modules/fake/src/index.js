export default function fake(...outputs) {
	return construct(new Fake(outputs));
}

function construct(fake) {
	return {
		FAKE(...args) {
			return fake.call(args);
		},
		args() {
			return [...fake];
		},
	};
}

class Fake {
	#inputs = [];
	#outputs;
	constructor(outputs = []) {
		this.#outputs = generates(outputs);
	}
	call(input) {
		this.#inputs.unshift(input);
		return this.#outputs.next().value;
	}
	[Symbol.iterator]() {
		return this.#inputs[Symbol.iterator]();
	}
}

function* generates(values) {
	for (const value of values)
		if (typeof value === 'function') yield* generates(value());
		else yield value;
}
