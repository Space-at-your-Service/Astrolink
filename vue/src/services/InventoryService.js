// Data API for Inventory data

import http from './http.common';

class InventoryService {
	async getItems() {
		return http.get('/inventory/')
	}
	
	async postItem(item) {
		return http.post('/inventory/', item)
	}

	async updateItem(item) {
		return http.put('/inventory/'+item.id.toString(), item)
	}

	async deleteItem(item) {
		return http.delete('/inventory/'+item.id.toString())
	}
}

export default new InventoryService();