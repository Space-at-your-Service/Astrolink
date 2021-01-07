// Data API for user data

import http from "./http.common";

class ProfileService {
  getUserProfile() {
    return http.get('/asclepios/profile/');
  }

  getPermissionLexicon() {
    return http.get('/asclepios/profile/permissions_lexicon/');
  }
}

export default new ProfileService();