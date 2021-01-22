export default class Experiment {
	constructor(title='', abstract='', description='', operators=[], supervisor='', procedures=[]) {
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