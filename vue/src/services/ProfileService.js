// Data API for user data

import http from "./http.common";

class ProfileService {
  getUserProfile() {
    return http.get('/asclepios/profile/');
  }

  getTasks() {
    return http.get('/activities/planning/');
  }

  getPermissionLexicon() {
    return http.get('/asclepios/profile/permissions_lexicon/');
  }
}

export default new ProfileService();