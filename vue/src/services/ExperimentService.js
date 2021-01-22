// Data API for Experiments data

import http from './http.common';

class ExperimentService {
	async getExperiments() {
		return http.get('/activities/experiments/');
	}
	
	async postExperiment(experiment) {
		return http.post('/activities/experiments/', experiment);
	}

	async updateExperiment(experiment) {
		return http.put('/activities/experiments/' + experiment.title, experiment);
	}

	async deleteExperiment(experiment) {
		return http.delete('/activities/experiments/' + experiment.title);
	}
}

export default new ExperimentService();