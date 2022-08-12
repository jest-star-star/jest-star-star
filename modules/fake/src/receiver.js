export default function receiver() {
	let items;
	return [receive, recall];

	function receive(item) {
		items = [item, items];
	}

	function* recall() {
		let p = items;
		while (p) {
			const [item] = p;
			yield item;
			[, p] = p;
		}
	}
}
