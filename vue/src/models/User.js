export default class User {
	constructor(username='', firstName='', lastName='', password='') {
		this.username = username
		this.first_name = firstName
		this.last_name = lastName
		this.password = password
		this.groups = []
		this.permissions = []
		this.favoriteProcedures = []
	}
}