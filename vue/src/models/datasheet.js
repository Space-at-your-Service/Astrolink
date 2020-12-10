export default class Datasheet{
	constructor(title='', content = '') {
		this.title = title
		this.date = new Date()
		this.content = content
	}
}