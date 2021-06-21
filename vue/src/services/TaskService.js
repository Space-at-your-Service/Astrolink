// Data API for flightplan and user planning

import http from './http.common';

class TaskService {
	async getFlightplan() {
		return http.get('/activities/flightplan/');
	}

	async getMccPlanning() {
		return http.get('/activities/plannings/');
	}

	async getUserPlanning() {
		return http.get('/activities/planning/');
	}

	async postTask(task) {
		return http.post('/activities/planning/', task);
	}

	async updateTask(task) {
		console.log(task)
		return http.put('/activities/tasks/'+task.id.toString(), task);
	}

	async deleteTask(task) {
		return http.delete('/activities/tasks/'+task.id.toString());
	}
}

export default new TaskService();