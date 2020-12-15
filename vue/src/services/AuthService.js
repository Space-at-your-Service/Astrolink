import http from './http.common';

class AuthService {
	login(user) {
		return http.post('/login/', {
				username: user.username,
				password: user.password
			}, 
			{"Content-type": "application/json"}
		)
		.then(response => {
			if (response.data.token) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		}
		);
	}

	logout() {
		localStorage.removeItem('user');
	}

	register(user) {
		return http.post('/signup/', {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
				password: user.password
			}, 
			{"Content-type": "application/json"}
		)
	}
}

export default new AuthService();