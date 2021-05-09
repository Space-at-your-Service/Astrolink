// Data API for Communications data

import http from './http.common';

class AudioService {
	

	async getAudio(pk) {
		return http.get('/audio/audios/'+pk, {responseType: 'blob'})
	}
	async getAudios() {
		return http.get('/audio/audios/')
	}

	async postAudio(formData, onUploadProgress) {
		return http.post('/audio/audios/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	
}

export default new AudioService();