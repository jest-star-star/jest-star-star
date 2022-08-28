// Can probably compose fake from stack and array.
// Is that what is already happening?

export default function fake(...outputs) {
	const consume = consumer(outputs);
	const [push, values] = stack();
	return { fake: FAKE, args: values };
	return [FAKE, values];

	const inputs = Stack.new();
	return { fake: FAKE, args: inputs[Symbol.iterator].bind(inputs) };
	// Need to capture the value if `inputs` when `args` is called.
	// Write tests, I guess.
	// stack.clone()?
	// return { fake: FAKE, args: inputs[Symbol.iterator].bind, thunk(inputs, clone)) };
	// Second thunk needs to be invoked before being passed to bind.
	return {
		fake: FAKE,
		args: thunk(inputs[Symbol.iterator].bind, [thunk(inputs, clone)]),
	};
	return [FAKE, inputs[Symbol.iterator].bind(inputs)];

	// Stack.prototype.clone = function clone() {
	// 	return Stack.new(this);
	// 	return Stack.new(iterable);
	// }

	function args() {
		// return [...inputs];
		// return ...inputs; // this should return an iterable?
		return { [Symbol.iterator]: inputs[Symbol.iterator].bind(inputs.clone()) };
	}

	function FAKE(...input) {
		// push creates a new stack?
		// Make stacks immutable.
		// Each operation returns a new stack?
		// Then args can just return the current stack!
		// return [FAKE, stack];
		// also, there's no need to clone.
		inputs = inputs.push(input);

		push(input);

		// As we push, `inputs = Stack.new()` does not change.
		// We need to be able to get an iterator factory
		// for the current state of `inputs`,
		// not just an iterator.
		inputs.push(input);
		return consume();
	}

	// [...args()].length;
	// [...args()][0];
	// length(args())
	// nth(args(), 5);

	// args should just return the iterator only.
	// args should just be the generator function of the stack.
	function args(n) {
		const inputs = values();
		return n === undefined ? [...inputs] : nth(inputs, n);
	}
}

function length(iter) {
	let n = 0;
	for (const i of iter) n += 1;
	return n;
}

// rename to at?
function nth(iter, n) {
	for (const i of iter) if (n-- === 0) return i;
}

function next(iter) {
	for (const i of iter) return i;
}

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

function thunk(fn, args = []) {
	return function THUNK() {
		return fn(...args);
	};
}

// stackify?  listify?
function consumer(items) {
	// items is an array, not an iterable.
	const iterator = iteratorFor(items);
	return function consume() {
		return next(iterator);
	};

	// MOVE UP!!!  Only here because of duplicate name.
	function* iteratorFor(items) {
		const iterator = items[Symbol.iterator]();
		while ((item = next(iterator))) {
			if (typeof item === 'function') yield* item();
			// if (typeof item === 'function') yield* iteratorFor(item());
			else yield item;
		}
	}
}

// // If value is array, that is `yield*`-able. :(
// function* iteratorFor(items) {
// 	const iterator = items[Symbol.iterator]();
// 	while (true) {
// 		const { done, value } = iterator.next();
// 		if (done) return;
// 		if (typeof value === 'function') yield* value();
// 		// if (typeof value === 'function') yield* iteratorFor(value());
// 		else yield value;
// 	}
// }

// function iteratorForIterable(items) {
// 	return items[Symbol.iterator]();
// }
//
// function isIteratable(items) {
// 	return (
// 		items != undefined &&
// 		items !== null &&
// 		typeof items[Symbol.iterator] === 'function'
// 	);
// }
//
// function isLikelyIterator(candidate) {
// 	return typeof candidate.next === 'function';
// }

// Document why `walk` is not recursive.
// We could never return an array, because we would walk it instead.
// If we call `walk` recursively, we'd have to start checking `next().done`,
// otherwise the recursive calls would never end --- `next()` can be called without bound.
//
// Well, have to return [[1,2,3]].

// function* walk(iterator) {
// 	let ongoing = true;
// 	while (ongoing) {
// 		const current = iterator.next();
// 		const item = current.value;
// 		ongoing = !current.done;
// 		if (typeof item === 'function') {
// 			const result = item();
// 			// Need to test if result is an iterator, not iterable.
// 			if (result[Symbol.iterator]) yield* result;
// 			else yield result;
// 		} else yield item;
// 	}
// }
