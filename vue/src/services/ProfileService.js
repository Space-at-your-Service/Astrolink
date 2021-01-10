// Data API for user data

import http from "./http.common";

class ProfileService {
  getUserProfile() {
    return http.get('/asclepios/profile/');
  }
}

export default new ProfileService();