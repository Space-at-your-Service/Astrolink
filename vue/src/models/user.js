import Role from './role'

export default class User {
	constructor(username='', firstName='', lastName='', role=new Role(), password='') {
		this.username = username
		this.firtName = firstName
		this.lastName = lastName
		this.role = role
		this.password = password

	}
}