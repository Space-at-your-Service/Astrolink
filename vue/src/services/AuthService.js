// API for token authentication

import http from './http.common'

class AuthService {
	async login(user) {
		return http.post('/login/', {
				username: user.username,
				password: user.password
			}
		)
	}
}

export default new AuthService()