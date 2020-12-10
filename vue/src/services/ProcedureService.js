import http from "./http.common";

class ProcedureService {
	getProcedures() {
		return http.get("/procedures/")
	}

	getFile(nick) {
		return http.get("/procedures/"+nick, {responseType: 'blob'})
	}

	uploadProcedure(formData, onUploadProgress) {
		return http.post("/procedures/", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		})
	}
}

export default new ProcedureService();