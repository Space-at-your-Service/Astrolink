// API for token authentication

import http from './http.common';
import axios from 'axios'

class AuthService {
	login(user) {
		return http.post('/login/', {
				username: user.username,
				password: user.password
			}
		)
		.then(response => {
			const token = response.data.token
			if (token) {
				localStorage.setItem('token', token);
				axios.defaults.headers.common['Authorization'] = 'Token ' + token
			}
			return response.data;
		});
	}

	logout() {
		localStorage.removeItem('token');
	}

	register(user) {
		return http.post('/signup/', {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
				password: user.password
			}
		)
	}
}

export default new AuthService();