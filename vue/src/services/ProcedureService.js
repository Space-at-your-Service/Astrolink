import http from "./http.common";

class ProcedureService {
	getProcedures() {
		return http.get("/activities/procedures/")
	}

	getFile(nick) {
		return http.get("/activities/procedures/"+nick, {responseType: 'blob'})
	}

	uploadProcedure(formData, onUploadProgress) {
		return http.post("/activities/procedures/", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		})
	}

	reuploadProcedure(nick, formData, onUploadProgress) {
		return http.put("/activities/procedures/"+nick, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		})
	}
}

export default new ProcedureService();