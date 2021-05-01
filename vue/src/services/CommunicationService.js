// Data API for Communications data

import http from './http.common';

class CommunicationService {
	async getUsers() {
		return http.get('/communication/')
	}

	async getRooms() {
		return http.get('/communication/rooms')
	}

	async updateRoom(room) {
		return http.put('/communication/'+room.name.toString(), room)
	}

	
}

export default new CommunicationService();