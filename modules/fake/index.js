const { from: all } = Array;

// const { from } = Array;
// const all = Function.prototype.apply.bind(Array.prototype.from);

export default function fake(...outputs) {
	const output = sender(outputs);
	const [receive, inputs] = receiver();
	return [FAKE, args];

	function FAKE(...input) {
		receive(input);
		return output();
	}

	function args(n) {
		const items = inputs();
		return n === undefined ? all(items) : nth(items, n);
	}
}

function nth(items, n) {
	for (const item of items) if (n-- === 0) return item;
}

function receiver() {
	let items;
	return [receive, recall];

	function receive(item) {
		items = [item, items];
	}

	function* recall() {
		let p = items;
		while (p) {
			const [item] = p;
			yield item;
			[, p] = p;
		}
	}
}

function sender(items) {
	return function send() {
		// What if items is a generator function?
		// Should use for..of instead of shift.
		const item = items.shift();
		return typeof item === 'function' ? item() : item;
	};
}
