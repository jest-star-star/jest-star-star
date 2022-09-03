export default function fake(...outputs) {
	const inputs = [];
	return {
		FAKE(...input) {
			inputs.push(input);
			return output();
		},
		args() {
			return [...inputs];
		},
	};
	function output() {
		const result = outputs.shift();
		if (typeof result === 'function') return result();
		else return result;
	}
}

// export default function fake(...outputs) {
// 	const inputs = [];
// 	const output = foo(outputs);
// 	return {
// 		FAKE(...input) {
// 			inputs.push(input);
// 			return output();
// 		},
// 		args() {
// 			return [...inputs];
// 		},
// 	};
// }

// function* foo(outputs) {
// }
