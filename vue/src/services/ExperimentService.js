// Data API for Experiments data

import http from './http.common';

class ExperimentService {
	getExperiments() {
		return http.get('/activities/experiments/');
	}
	
	postExperiments(experiment) {
		return http.post('/activities/experiments/', experiment)
	}

	updateExperiments(experiment) {
		return http.put('/activities/experiments/' + experiment.nick, experiment)
	}

	deleteExperiments(experiment) {
		return http.delete('/activities/experiments/' + experiment.nick)
	}
}

export default new ExperimentService();