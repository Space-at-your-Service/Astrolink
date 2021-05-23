// Data API for Audios data

import http from './http.common';

class AudioService {
	

	async getAudio(id) {
		return http.get('/audio/audios/'+id, {responseType: 'blob'})
	}
	async getAudios() {
		return http.get('/audio/audios/')
	}

	async postAudio(formData, onUploadProgress) {
		return http.post('/audio/audios/'+formData.get('id'), formData, {
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