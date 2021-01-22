// Data API for Procedures data

import http from './http.common';

class ProcedureService {

	async getProcedures() {
		return http.get('/activities/procedures/')
	}

	// getProcedureTypes() {
	// 	return http.get('/activities/procedureTypes/')
	// }

	async getFile(title) {
		return http.get('/activities/procedures/'+title, {responseType: 'blob'})
	}

	async postProcedure(formData, onUploadProgress) {
		return http.post('/activities/procedures/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	async updateProcedure(formData, onUploadProgress) {
		return http.put('/activities/procedures/'+formData.get('title'), formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	async deleteProcedure(procedure) {
		return http.delete('/activities/procedures/'+procedure.title)
	}
}

export default new ProcedureService();