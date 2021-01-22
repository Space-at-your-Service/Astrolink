import DateFormat from '../utils/DateFormat.js'

export default class Textsheet{
	constructor(creator=undefined) {
		this.title = 'Untitled'
		this.content = ''
		this.creator = creator
		this.creationDate = DateFormat.dateString()
		this.lastUser = creator
		this.lastModifiedDate = DateFormat.dateString()
	}
}