import { createHash } from 'node:crypto';

export default function hashsum(items) {
	return items.reduce(update, createHash('sha256')).digest('hex');
}

function update(hash, item) {
	return hash.update(`${item}`).update('\0', 'utf8');
}
