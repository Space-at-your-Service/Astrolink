// Data API for Communications data

import http from './http.common';

class AudioService {
	


	async getAudios() {
		return http.get('/audio/')
	}

	async postAudio(audio) {
		return http.post('/audio/', audio)
	}

	
}

export default new AudioService();