class DateFormat {

	dateStringNow() {
		const date = new Date()
		const options1 = { year: 'numeric', month: 'numeric', day: 'numeric' };
		const options2 = {hour: '2-digit', minute:'2-digit'}
		return date.toLocaleDateString('en-CH', options1) + ' at ' + date.toLocaleTimeString('en-CH',options2)
	}

	dateString(rawDate) {
		const date = new Date(rawDate)
		const options1 = { year: 'numeric', month: 'numeric', day: 'numeric' };
		const options2 = {hour: '2-digit', minute:'2-digit'}
		return date.toLocaleDateString('en-CH', options1) + ' at ' + date.toLocaleTimeString('en-CH',options2)
	}
}

export default new DateFormat()