// Boilerplate for all http requests, including base url and authentication token

import axios from 'axios'

const http = axios.create({
	baseURL: 'http://localhost:8000',
	timeout: 3000
});

// add the user's authentication token to all requests if logged in
http.interceptors.request.use(
	config => {
		console.log('hey')
		const token = sessionStorage.getItem('token');
		if (token) {
			config.headers.common['Authorization'] = 'Token ' + token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default http