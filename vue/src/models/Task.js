export default class Task {
	constructor(holder='', start='', end='', title='',
	content='', category='', split='', procedures=[], background=false, allDay=false) {
		this.holder = holder
		this.start = start
		this.end = end
		this.title = title
		this.content = content
		this.class = category
		this.split = split
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