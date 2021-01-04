// Data API for Experiments data

import http from './http.common';

class ExperimentService {
	getExperiments() {
		return http.get("/");
	}
	
	postExperiments(experiment) {
		return http.post("/", experiment)
	}

	updateExperiments(experiment) {
		return http.put("/", experiment)
	}

	deleteExperiments(experiment) {
		return http.delete("/", experiment)
	}
}

export default new ExperimentService();