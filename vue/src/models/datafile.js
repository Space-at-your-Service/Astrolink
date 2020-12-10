export default class Datafile {
	constructor(title='', file = undefined) {
		this.title = title
		this.date = new Date()
		this.file= file
	}
}