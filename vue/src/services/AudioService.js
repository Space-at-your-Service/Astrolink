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

	async putAudio(audio) {
		return http.put('/audio/audios/'+audio.id.toString(), audio)
	}

	
}

export default new AudioService();