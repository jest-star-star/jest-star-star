import { createHash } from 'node:crypto';

export default function hashsum(items) {
	let hash = createHash('sha256');
	hash = items.reduce(updateHash, hash);
	const sum = hash.digest('hex');

	return sum;
}

// `accumulate`?
function updateHash(hash, item) {
	hash = hash.update(`${item}`);
	hash = hash.update('\0', 'utf8');

	return hash;
}
