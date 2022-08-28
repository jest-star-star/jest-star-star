// rename to stack?  push, pop, at, top/peek
// return { foo, bar } with { foo, bar }[Symbol.iterator] defined?
function stack() {
	// const items = list();

	// Replace all `let` variables with a function call
	// where a function parameter can serve as the `let` variable?

	let items;

	return { push, values };

	function push(item) {
		items = [item, items];
	}

	function values() {
		return { [Symbol.iterator]: thunk(iteratorFor, [items]) };
	}
}

function* iteratorFor(items) {
	while (items) {
		const [item] = items;
		yield item;
		[, items] = items;
	}
}

function size(iter) {
	let n = 0;
	for (const i of iter) n += 1;
	return n;
}
