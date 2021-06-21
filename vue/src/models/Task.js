export default class Task {
	constructor(split='', start='', end='', title='',
	content='', category='', procedures=[], background=false, allDay=false) {
		this.split = split
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
