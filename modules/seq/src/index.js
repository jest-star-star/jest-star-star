export default function seq(i = 1, step = 1) {
	if (typeof i !== 'number') throw new TypeError(`not a number: ${i}`);
	if (typeof step !== 'number') throw new TypeError(`not a number: ${step}`);
	return SEQ(i, step);
}

function* SEQ(i, step) {
	while (true) {
		yield i;
		i += step;
	}
}
