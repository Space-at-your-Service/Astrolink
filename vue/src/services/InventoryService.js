// Data API for Inventory data

import http from './http.common';

class InventoryService {
	getItems() {
		return http.get("/inventory/");
	}
	
	postItem(item) {
		return http.post("/inventory/", item)
	}

	updateItem(item) {
		return http.put("/inventory/"+item.id.toString(), item)
	}

	deleteItem(item) {
		return http.delete("/inventory/"+item.id.toString())
	}
}

export default new InventoryService();