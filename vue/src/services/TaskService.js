// Data API for flightplan and user planning

import http from './http.common';

class TaskService {
	async getFlightplan() {
		return http.get('/activities/flightplan/');
	}

	async getUserPlanning() {
		return http.get('/activities/planning/');
	}

	async postTask(task) {
		console.log(JSON.stringify(task));
		return http.post('/activities/planning/', task);
	}
}

export default new TaskService();