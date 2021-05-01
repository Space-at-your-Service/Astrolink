// Data API for Communications data

import http from './http.common';

class CommunicationService {
	

	async getRooms() {
		return http.get('/communication/')
	}

	async updateRoom(room) {
		return http.put('/communication/'+room.id.toString(), room)
	}

	
}

export default new CommunicationService();