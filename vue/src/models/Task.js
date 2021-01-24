export default class Task {
	constructor(holder='', start='', end='', title='',
	content='', category='', procedures=[], background=false, allDay=false) {
		// this.id = undefined
		this.holder = holder
		this.start = start
		this.end = end
		this.title = title
		this.content = content
		this.class = category
		this.procedures = procedures
		this.background = background
		this.allDay = allDay
	}

	isBackground() {
		this.background = true
	}

	isAllDay() {
		this.allDay = true
	}

}
