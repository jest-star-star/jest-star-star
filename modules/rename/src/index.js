import reset from '#reset';

export default function rename(...args) {
	return reset('name', ...args);
}
