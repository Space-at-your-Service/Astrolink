// Data API for flightplan and user planning

import http from "./http.common";

class TaskService {
  getFlightplan() {
    return http.get('/activities/flightplan/');
  }

  getUserPlanning() {
    return http.get('/activities/planning/');
  }
}

export default new TaskService();