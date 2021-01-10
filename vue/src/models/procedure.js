import StringFormat from '../utils/StringFormat.js'

export default class Procedure {
	constructor(title='', type='', subtype='', abstract='', file=undefined) {
		this.nick = StringFormat.toNick(title)
		this.title = title
		this.type = type
		this.subtype = subtype
		this.abstract = abstract
		this.file = file
	}
}