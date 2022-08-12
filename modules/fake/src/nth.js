export default function nth(items, n) {
	for (const item of items) if (n-- === 0) return item;
}
