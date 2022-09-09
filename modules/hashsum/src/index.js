import { createHash } from 'node:crypto';

export default function hashsum(items = []) {
	const hash = createHash('sha256');
	items.reduce(update, hash);
	return hash.digest('hex');
}

function update(hash, item) {
	hash.update(`${item}`);
	hash.update('\0', 'utf8');
	return hash;
}
