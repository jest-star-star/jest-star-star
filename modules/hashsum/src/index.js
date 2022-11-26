import { createHash } from 'node:crypto';

const { stringify } = JSON;

export default function hashsum(items = []) {
	const hash = createHash('sha256');
	items.reduce(update, hash);
	return hash.digest('hex');
}

function update(hash, item) {
	hash.update(stringify(item));
	hash.update('\0', 'utf8');
	return hash;
}
