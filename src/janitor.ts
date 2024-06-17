type JanitorItem = RBXScriptConnection | Instance | Callback;

export class Janitor {
	items: JanitorItem[] = [];

	Add(item: JanitorItem) {
		this.items.push(item);
	}

	Cleanup() {
		for (const item of this.items) {
			if (typeIs(item, "RBXScriptConnection")) {
				item.Disconnect();
			} else if (typeIs(item, "Instance")) {
				item.Destroy();
			} else {
				item();
			}
		}

		this.items = [];
	}
}
