class Serializer {

	serializeTask(task) {
		const serializedTask = {}
		serializedTask.holder = task.split
		serializedTask.start = task.start
		serializedTask.end = task.end
		serializedTask.title = task.title
		serializedTask.content = task.content
		serializedTask.category = task.class
		serializedTask.procedures = task.procedures
		serializedTask.background = task.background
		serializedTask.allDay = task.allDay
		return serializedTask
	}

	deserializeTask(serializedTask) {
		const task = {}
		task.split = serializedTask.holder
		task.start = new Date(serializedTask.start)
		task.end = new Date(serializedTask.end)
		task.title = serializedTask.title
		task.content = serializedTask.content
		task.class = serializedTask.category
		task.procedures = serializedTask.procedures
		task.background = serializedTask.background
		task.allDay = serializedTask.allDay
		return task
	}
}

export default new Serializer()