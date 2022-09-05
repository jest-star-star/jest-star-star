import Fake from './Fake.js';

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
