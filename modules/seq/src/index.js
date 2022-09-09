export default function seq(i = 1, step = 1) {
	if (typeof i !== 'number') throw new TypeError(`not a number: ${i}`);
	if (typeof step !== 'number') throw new TypeError(`not a number: ${step}`);
	return construct(i, step);
}

function* construct(i, step) {
	while (true) {
		yield i;
		i += step;
	}
}
