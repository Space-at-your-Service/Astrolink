// Data API for user data

import http from './http.common';

class ProfileService {
  async getUserProfile() {
    return http.get('/asclepios/profile/');
  }

  async updatePassword(oldPassword, newPassword) {
    return http.put('/asclepios/password/', {oldPassword: oldPassword, newPassword: newPassword});
  }

  async updateFavorites(favoriteProceduresTitles) {
    return http.put('/asclepios/profile/', { favoriteProcedures: favoriteProceduresTitles });
  }

  async getUnit(unit) {
   return http.get('/asclepios/unit/'+unit);
  }
}

export default new ProfileService();