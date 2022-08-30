export default function fake(...outputs) {
	const inputs = [];
	return {
		FAKE(...input) {
			inputs.push(input);
			return outputs.shift();
		},
		args() {
			return [...inputs];
		},
	};
}

// export default function fake(...outputs) {
// 	const inputs = [];
// 	return [FAKE, args];
// 	function FAKE(...input) {
// 		inputs.push(input);
// 		return outputs.shift();
// 	}
// 	function args() {
// 		return [...inputs];
// 	}
// }

// export default function fake(...outputs) {
// 	const inputs = [];
// 	const output = foo(outputs);
// 	return [FAKE, args];
// 	function FAKE(...input) {
// 		inputs.push(input);
// 		return output();
// 	}
// 	function args() {
// 		return [...inputs];
// 	}
// }
//
// function* foo(outputs) {
// }
