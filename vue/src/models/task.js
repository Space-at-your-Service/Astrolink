export default class Task {
	constructor(start='', end='', title='',
	content='', category='', split='', procedures=[], background=false, allDay=false) {
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
