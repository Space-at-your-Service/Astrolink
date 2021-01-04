// Data API for Procedures data

import http from "./http.common";

class ProcedureService {
	getProcedures() {
		return http.get("/activities/procedures/")
	}

	// getProcedureTypes() {
	// 	return http.get("/activities/procedureTypes/")
	// }

	getFile(nick) {
		return http.get("/activities/procedures/"+nick, {responseType: 'blob'})
	}

	postProcedure(formData, onUploadProgress) {
		return http.post("/activities/procedures/", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		})
	}

	updateProcedure(nick, formData, onUploadProgress) {
		return http.put("/activities/procedures/"+nick, formData, {
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