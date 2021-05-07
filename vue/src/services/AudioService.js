// Data API for Communications data

import http from './http.common';

class AudioService {
	


	async getAudios() {
		return http.get('/audio/')
	}

	async postAudio(formData, onUploadProgress) {
		return http.post('/audio/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	
}

export default new AudioService();