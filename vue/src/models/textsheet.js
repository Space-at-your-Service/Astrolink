import DateFormat from '../utils/DateFormat.js'

export default class Textsheet{
	constructor(title='', content = '') {
		this.title = title
		this.content = content
		this.creator = undefined
		this.creationDate = DateFormat.dateString()
		this.lastUser = undefined
		this.lastModifiedDate = DateFormat.dateString()
	}
}