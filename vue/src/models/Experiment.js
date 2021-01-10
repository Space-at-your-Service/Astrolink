import StringFormat from '../utils/StringFormat.js'

export default class Experiment {
	constructor(title='', abstract='', description='', operators=[], supervisor='', procedures=[]) {
		this.nick = StringFormat.toNick(title)
		this.title = title
		this.abstract = abstract
		this.description = description
		this.operators = operators
		this.supervisor = supervisor
		this.procedures = procedures
		this.data = {textsheets: [], spreadsheets: []}
		this.status = 'planned'
	}
}