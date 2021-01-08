export default class Procedure {
	constructor(nick='', title='', type='', subtype='', abstract='', file=undefined) {
		this.nick = nick
		this.title = title
		this.types = {subtype: subtype, masterType: type}
		this.abstract = abstract
		this.file = file
	}
}