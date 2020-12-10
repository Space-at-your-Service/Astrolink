import axios from 'axios'
import authHeader from './auth.header'

const contentHeader = {
    "Content-type": "application/json"
  }

export default axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		...contentHeader,
		...authHeader()
	}
});