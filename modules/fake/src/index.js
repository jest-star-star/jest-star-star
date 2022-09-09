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
		this.#outputs = generate(outputs);
	}
	call(input) {
		this.#inputs.unshift(input);
		return this.#outputs.next().value;
	}
	[Symbol.iterator]() {
		return this.#inputs[Symbol.iterator]();
	}
}

function* generate(values) {
	for (const value of values)
		if (typeof value === 'function') yield* generate(value());
		else yield value;
}
