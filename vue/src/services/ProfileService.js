// Data API for user data

import http from './http.common';

class ProfileService {
  getUserProfile() {
    return http.get('/asclepios/profile/');
  }

  updatePassword(oldPassword, newPassword) {
    return http.put('/asclepios/profile/', {oldPassword: oldPassword, newPassword: newPassword});
  }

  updateFavorites(favoriteProcedures) {
    return http.put('/asclepios/profile/', { favoriteProcedures: favoriteProcedures });
  }

  getGroupUsers(group) {
   return http.get('/asclepios/group/'+group);
  }
}

export default new ProfileService();