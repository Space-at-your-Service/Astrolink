// Boilerplate for all http requests, including url and authentication token

import axios from 'axios'

// add the user's authentication token to all requests if logged in
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + token
}

export default axios.create({
	baseURL: "http://localhost:8000"
});