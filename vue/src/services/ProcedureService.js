// Data API for Procedures data

import http from './http.common';

class ProcedureService {
	// getProcedureTypes() {
	// 	return http.get('/')
	// }

	getProcedures() {
		return http.get('/activities/procedures/')
	}

	// getProcedureTypes() {
	// 	return http.get('/activities/procedureTypes/')
	// }

	getFile(title) {
		return http.get('/activities/procedures/'+title, {responseType: 'blob'})
	}

	// getFavorites() {
	// 	return http.get('/activities/procedures/favorites'+username)
	// }

	postProcedure(formData, onUploadProgress) {
		return http.post('/activities/procedures/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	updateProcedure(formData, onUploadProgress) {
		return http.put('/activities/procedures/'+formData.get('title'), formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	deleteProcedure(procedure) {
		return http.delete('/activities/procedures/'+procedure.title)
	}
}

export default new ProcedureService();