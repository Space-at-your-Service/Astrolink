export default class Role {
	constructor(name='none', permissions = []) {
		this.name = name
		this.permissions = permissions
	}
}