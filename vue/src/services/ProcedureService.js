// Data API for Procedures data

import http from "./http.common";

class ProcedureService {
	// getProcedureTypes() {
	// 	return http.get("/")
	// }

	getProcedures() {
		return http.get("/activities/procedures/")
	}

	// getProcedureTypes() {
	// 	return http.get("/activities/procedureTypes/")
	// }

	getFile(nick) {
		return http.get("/activities/procedures/"+nick, {responseType: 'blob'})
	}

	// getFavorites() {
	// 	return http.get("/activities/procedures/favorites"+username)
	// }

	postProcedure(formData, onUploadProgress) {
		return http.post("/activities/procedures/", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		})
	}

	updateProcedure(formData, onUploadProgress) {
		return http.put("/activities/procedures/"+formData.get('nick'), formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		})
	}

	deleteProcedure(procedure) {
		return http.delete("/activities/procedures/"+procedure.nick)
	}
}

export default new ProcedureService();