
const dateString = () => {
				const date = new Date()
				const options1 = { year: 'numeric', month: 'numeric', day: 'numeric' };
				const options2 = {hour: '2-digit', minute:'2-digit'}
				return date.toLocaleDateString('en-CH', options1) + ' at ' + date.toLocaleTimeString('en-CH',options2)
			}

export default class Textsheet{
	constructor(title='', content = '') {
		this.title = title
		this.content = content
		this.creator = undefined
		this.creationDate = dateString()
		this.lastUser = undefined
		this.lastModifiedDate = dateString()
	}
}