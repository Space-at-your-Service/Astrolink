<template>
	<div>
		<div class="my-3 p-0">
			<b-button-group>
				<b-button @click="selectedDate = new Date()" variant="primary"  style="border-bottom-right-radius: : 15px; border-top-right-radius: : 15px; font-weight: bold; font-color: white; letter-spacing: 1px">
					TODAY
				</b-button>
				<b-button @click="selectedDate= new Date(missionStartDate);" class="ml-1 " style="border-bottom-left-radius: : 15px; border-top-left-radius: : 15px; font-weight: bold; font-color: white; letter-spacing: 1px; background-color: var(--crimson);">
					MISSION
				</b-button>
			</b-button-group>
		</div>

		

		<div style="height: 1129px; background-color: #fff; color: black; border-radius: 15px 15px 0px 15px;">
			
			<vue-cal ref="vuecal"
				:editable-events="editionOptions"
				:selected-date="selectedDate"
				:time-from="6 * 60"
				:time-to="23*60"
				:time-step="30"
				:snap-to-time="5"
				:sticky-split-labels="true"
				:disable-views="['years', 'year', 'week']"
				active-view = 'day'
				show-all-day-events="short"
				click-to-navigate
				hide-view-selector
				:watchRealTime="true"
				:timeCellHeight="30"
				:events="tasks"
				:on-event-click="onEventClick"
				:on-event-create="onEventCreate"
				@event-drag-create="selectAndShowCreateModal"
				@event-duration-change="editTaskInteractive"
				@event-drop="editTaskInteractive"
				:split-days="splitDays"
				class="font-roboto"
				>

				<template v-slot:title="{ title, view }" >
					<span style="font-family: Roboto, sans-serif;" v-if="view.id === 'day'"> {{ view.startDate.toLocaleDateString('en-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} </span>
					<strong style="font-family: Roboto, sans-serif; color: navy;" v-if="getMissionDayNumber(view.startDate) < 0 && view.id === 'day'">{{ -1* getMissionDayNumber(view.startDate) }} days before MISSION</strong>
					<strong style="font-family: Roboto, sans-serif; color: var(--crimson);" v-if="getMissionDayNumber(view.startDate) >= 0 && getPostMissionDayNumber(view.startDate) <= 0 && view.id === 'day'">MISSION day {{ getMissionDayNumber(view.startDate) + 1}} </strong>
					<strong style="font-family: Roboto, sans-serif; color: navy" v-if="getPostMissionDayNumber(view.startDate) > 0 && view.id === 'day'"> {{ getPostMissionDayNumber(view.startDate) }} days after MISSION</strong>

					<span style="font-family: Roboto, sans-serif;" v-if="view.id === 'month'"> {{ view.startDate.toLocaleDateString('en-CH', { year: 'numeric', month: 'long'}) }} </span>
				</template>

				<template v-slot:today-button >
					<b-button variant="primary"  style="border-radius: 15px; font-weight: bold; font-color: white; letter-spacing: 1px">
						TODAY
					</b-button>
				</template>

				<template v-slot:arrow-next >
					<div class="hover-translate-right">
						<b-icon icon="chevron-right" scale="1.3"></b-icon>
					</div>
				</template>

				<template v-slot:arrow-prev >
					<div class="hover-translate-left">
						<b-icon icon="chevron-left" scale="1.3"></b-icon>
					</div>
				</template>

				<template v-slot:time-cell="{ hours, minutes }">
					<div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
						<strong v-if="!minutes" style="font-family: Roboto, sans-serif; font-size: 1rem; color: black;" class="text-center">{{ hours }}h</strong>
						<span v-else style="font-family: Roboto, sans-serif; font-size: 0.8rem; color: #555">{{ minutes }}</span>
					</div>
				</template>
				
				<template v-slot:event="{ event }">
						<div class="vuecal__event-title" v-if="!event.resizing" style="justify-content: center; align-self: center;">
							{{ event.title }}
						</div>
						
						<div class="vuecal__event-time" v-if="event.resizing">
							<div> From <strong>{{ event.start.formatTime('HH:mm') }} </strong></div>
							<div> To <strong>{{ event.end.formatTime('HH:mm') }} </strong></div>
						</div>
					
				</template>

				<template v-slot:no-event>Nothing yet</template>
			</vue-cal>

			<b-modal id="createModal" title="New task" v-model="showCreateModal" @ok.prevent="okCreate()" @cancel="cancelCreate()" @close="cancelCreate()" @hidden="resetSelectedEvent" no-close-on-backdrop>
				<b-form ref="createForm" @submit.stop.prevent="handleSubmit">
					<b-container>
						<b-row>
							<b-col>
								<b-form-group 
								label="From"
								label-for="startTimeInput">
									<b-form-timepicker id="startTimeInput" v-model="selectedEventStartTime" minutes-step="5" hide-header no-close-button required :disabled="selectedEvent.allDay"></b-form-timepicker>
								</b-form-group>
							</b-col>

							<b-col>
								<b-form-group 
								label="To"
								label-for="endTimeInput">
									<b-form-timepicker id="endTimeInput" v-model="selectedEventEndTime" minutes-step="5" hide-header no-close-button required :disabled="selectedEvent.allDay"></b-form-timepicker>
								</b-form-group>
							</b-col>
						</b-row>

						<b-form-group 
						label="Title"
						label-for="titleInput">
							<b-input id="titleInput" v-model="selectedEvent.title" placeholder="Task name" required></b-input>
						</b-form-group>
					
						<b-form-group 
						label="Content"
						label-for="contentInput">
							<b-form-textarea id="contentInput" v-model="selectedEvent.content" placeholder="Task content" rows="4" cols="50" required></b-form-textarea>
						</b-form-group>

						<b-form-group 
						label="Category"
						label-for="categoryInput">
							<b-form-select id="categoryInput" :options="eventsCssClasses" v-model="selectedEvent.class" required>
								<template #first>
									<b-form-select-option value="" disabled>Select a task category</b-form-select-option>
								</template>
							</b-form-select>
						</b-form-group>

						<div class="text-primary hover-pointer" @click="showLinkToInput=true" v-if="!showLinkToInput">
							<b-icon icon="link45deg"></b-icon>
							Link to procedures
						</div>

						<b-form-group
						label="Link to"
						label-for="createdProceduresInput"
						v-if="showLinkToInput"
						>
							<b-form-select id="createdProceduresInput" v-model="selectedEvent.procedures" :options="proceduresAsOptions" multiple :select-size="10" >
								<template #first>
									<b-form-select-option value="" disabled @click="selectedEvent.procedures = []">Select one or several procedures</b-form-select-option>
								</template>
							</b-form-select>
						</b-form-group>

					</b-container>

					<div @click="showMoreOptions = !showMoreOptions" style="color: black; font-weight: bold">
						<span v-if="!showMoreOptions" class="hover-pointer">
							<b-icon icon="chevron-down"></b-icon>
							More options
						</span>
						<span v-if="showMoreOptions" class="hover-pointer">
							<b-icon icon="chevron-up"></b-icon>
							Less options
						</span>
					</div>
					<b-container v-if="showMoreOptions" class="mt-2">
						<b-form-group
						>
							<template #label>
								Performed by:
								<br/>
								<b-form-checkbox @change="selectAllSplits" class="mt-2">
									<strong>Everyone</strong>
								</b-form-checkbox>
							</template>

							<b-form-checkbox-group
							v-model="selectedEventSplits"
							:options="userNames"
							inline
							>
							</b-form-checkbox-group>

						</b-form-group>

						<b-form-group
						label="All day:"
						label-cols="auto">
							<b-form-checkbox v-model="selectedEvent.allDay" switch class="mt-2 ml-1">
								{{ selectedEvent.allDay ? 'Yes' : 'No' }}
							</b-form-checkbox>
						</b-form-group>

						<b-form-group
						label="Repeated daily:"
						label-cols="auto">
							<b-form-checkbox v-model="selectedEventEveryday" switch class="mt-2 ml-1" disabled>
								{{ selectedEventEveryday ? 'Yes' : 'No' }}
							</b-form-checkbox>
						</b-form-group>

						<b-form-group
						label="Background task (can be overriden):"
						label-cols="auto">
							<b-form-checkbox v-model="selectedEvent.background" switch class="mt-2 ml-1">
								{{ selectedEvent.background ? 'Yes' : 'No' }}
							</b-form-checkbox>
						</b-form-group>

					</b-container>
				</b-form>
			</b-modal>

			<b-modal id="eventModal" v-model="showEventModal" @hidden="resetSelectedEvent">
				<template #modal-title>
					{{ selectedEvent.split }}: {{ selectedEvent.title }}
					<b-badge :class="selectedEvent.class">{{ selectedEvent.class }}</b-badge>
				</template>
				<template #modal-footer>
					<b-button variant="danger" @click="deleteTask(selectedEvent)" v-if="!isEditingEvent && isAllowed('activities.delete_task')">
						<b-icon icon="trash"></b-icon> Delete
					</b-button>
					<b-button @click="isEditingEvent = true" variant="info" v-if="!isEditingEvent && isAllowed('activities.change_task')">
						<b-icon icon="pencil-square"></b-icon> Edit
					</b-button>
					<b-button variant="info" @click="okEdit" v-if="isEditingEvent">
						Confirm
					</b-button>
				</template>
				<b-container v-if="!isEditingEvent">
					<b-row>
						<strong>{{ selectedEvent.content}}</strong>
					</b-row>
					<br/>
					<b-row>
						{{ (new Date(selectedEvent.start)).toLocaleDateString('en-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
					</b-row>
					<b-row v-if="!selectedEvent.allDay">
						From {{ (new Date(selectedEvent.start)).formatTime('HH:mm') }} to {{ (new Date(selectedEvent.end)).formatTime('HH:mm') }} 
					</b-row>
					<b-row v-if="selectedEvent.allDay">
						All day
					</b-row>
					<b-row class="mt-3" v-if="selectedEvent.procedures.length > 0">
						Linked procedures:
					</b-row>
					<b-row>
						<ul>
							<li v-for="procedure in selectedEvent.procedures" :key="procedure.nick" @click="openPDF(procedure.title)" class="hover-pointer text-primary">
								[{{ procedure.type }} > {{ procedure.subtype }}] <strong>{{ procedure.title }}</strong>
							</li>
						</ul>
					</b-row>
				</b-container>
				<b-form ref="editForm" @submit.stop.prevent="handleSubmit">
					<b-container v-if="isEditingEvent">
						<b-row>
							<b-col>
								<b-form-group 
								label="From"
								label-for="startTimeInput">
									<b-form-timepicker id="startTimeInput" v-model="selectedEventStartTime" minutes-step="5" hide-header no-close-button required :disabled="selectedEvent.allDay"></b-form-timepicker>
								</b-form-group>
							</b-col>

							<b-col>
								<b-form-group 
								label="To"
								label-for="endTimeInput">
									<b-form-timepicker id="endTimeInput" v-model="selectedEventEndTime" minutes-step="5" hide-header no-close-button required :disabled="selectedEvent.allDay"></b-form-timepicker>
								</b-form-group>
							</b-col>
						</b-row>

						<b-form-group 
						label="Title"
						label-for="titleInput">
							<b-input id="titleInput" v-model="selectedEvent.title" placeholder="Task name" required></b-input>
						</b-form-group>
					
						<b-form-group 
						label="Content"
						label-for="contentInput">
							<b-form-textarea id="contentInput" v-model="selectedEvent.content" placeholder="Task content" rows="4" cols="50" required></b-form-textarea>
						</b-form-group>

						<b-form-group 
						label="Category"
						label-for="categoryInput">
							<b-form-select id="categoryInput" :options="eventsCssClasses" v-model="selectedEvent.class" required>
								<template #first>
									<b-form-select-option value="" disabled>Select a task category</b-form-select-option>
								</template>
							</b-form-select>
						</b-form-group>

						<div class="text-primary hover-pointer" @click="showLinkToInput=true" v-if="!showLinkToInput">
							<b-icon icon="link45deg"></b-icon>
							Link to procedures
						</div>

						<b-form-group
						label="Link to"
						label-for="createdProceduresInput"
						v-if="showLinkToInput"
						>
							<b-form-select id="createdProceduresInput" v-model="selectedEvent.procedures" :options="proceduresAsOptions" multiple :select-size="10" >
								<template #first>
									<b-form-select-option value="" disabled @click="selectedEvent.procedures = []">Select one or several procedures</b-form-select-option>
								</template>
							</b-form-select>
						</b-form-group>

					</b-container>
					<div @click="showMoreOptions = !showMoreOptions" style="color: black; font-weight: bold" v-if="isEditingEvent">
						<span v-if="!showMoreOptions" class="hover-pointer">
							<b-icon icon="chevron-down"></b-icon>
							More options
						</span>
						<span v-if="showMoreOptions" class="hover-pointer">
							<b-icon icon="chevron-up"></b-icon>
							Less options
						</span>
					</div>
					<b-container v-if="showMoreOptions && isEditingEvent" class="mt-2">

						<b-form-group
						label="All day:"
						label-cols="auto">
							<b-form-checkbox v-model="selectedEvent.allDay" switch class="mt-2 ml-1">
								{{ selectedEvent.allDay ? 'Yes' : 'No' }}
							</b-form-checkbox>
						</b-form-group>

						<b-form-group
						label="Background task (can be overriden):"
						label-cols="auto">
							<b-form-checkbox v-model="selectedEvent.background" switch class="mt-2 ml-1">
								{{ selectedEvent.background ? 'Yes' : 'No' }}
							</b-form-checkbox>
						</b-form-group>

					</b-container>
				</b-form>
			</b-modal>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'
	import VueCal from 'vue-cal'
	import 'vue-cal/dist/vuecal.css'
	import 'vue-cal/dist/drag-and-drop.js'
	import Task from '../models/Task'
	import Dialog from '../utils/Dialog.js'
	import ProcedureService from '../services/ProcedureService.js'
	import Notif from '../utils/Notif.js'

	export default {
		components: { VueCal },
		props: ['tasks', 'eventsCssClasses', 'userList', 'userNames', 'moduleName'],

		data() {
			return {
				selectedDate: new Date(),
				selectedEvent: new Task(),
				showEventModal: false,
				showCreateModal: false,
				editable: false,
				selectedEventSplits: [],
				selectedEventEveryday: false,
				showMoreOptions: false,
				showLinkToInput: false,
				isEditingEvent: false,
				showDatePicker: false
			}
		},

		computed: {
			...mapState(['missionStartDate', 'missionEndDate']),
			...mapGetters('procedure', ['proceduresAsOptions']),
			...mapGetters('user', ['isAllowed']),

			editionOptions() {
				return { title: false, drag: this.isAllowed('activities.change_task'), resize: this.isAllowed('activities.change_task'), delete: false, create: this.isAllowed('activities.add_task') }
				
			},
			minDate() {
				return new Date().subtractDays(10)
			},
			maxDate() {
				return new Date().addDays(10)
			},
			splitDays() { 
				var splitDays = []
				for (var user of this.userList){
					var splitDay = { id: user.username, class: user.username, label: user.username, hide: false }
					splitDays.push(splitDay)
				}
				return splitDays
			},
			selectedEventStartTime: {
				get: function() {
					if (!this.selectedEvent.start) return ''
					else return this.selectedEvent.start.formatTime('HH:mm')
				},
				set: function(newTime) {
					const hours = newTime.slice(0, 2)
					const mins = newTime.slice(3, 5)
					this.selectedEvent.start.setHours(hours)
					this.selectedEvent.start.setMinutes(mins)
				}
			},
			selectedEventEndTime: {
				get: function() {
					if (!this.selectedEvent.end) return ''
					else return this.selectedEvent.end.formatTime('HH:mm')
				},
				set: function(newTime) {
					const hours = newTime.slice(0, 2)
					const mins = newTime.slice(3, 5)
					this.selectedEvent.end.setHours(hours)
					this.selectedEvent.end.setMinutes(mins)
				}
			}
		},

		methods: {
			selectAllSplits(checked) {
				this.selectedEventSplits = checked ? this.userNames.slice() : []
			},

			getMissionDayNumber(date) {
				return Math.floor((date.getTime() - this.missionStartDate.getTime())/(1000*3600*24))
			},

			getPostMissionDayNumber(date) {
				return Math.floor((date.getTime() - this.missionEndDate.getTime())/(1000*3600*24))
			},

			getDateString() {
				var date = new Date()
				var year = date.getYear()
				var month = date.getMonth()
				var day = date.getDate()
				return year+"-"+month+"-"+day
			},

			getTimeString() {
				var date = new Date()
				var hours = date.getHours()
				var minutes = date.getMinutes()
				return hours+":"+minutes
			},

			onEventClick(event, e) {
				e.stopPropagation()
				this.selectedEvent = {...event}
				this.showEventModal = true
			},

			onEventCreate(event, deleteEventFunction) {
				this.selectedEvent = {...event, ...{ procedures: [] }}
				this.deleteEventFunction = deleteEventFunction
				this.selectedEventSplits = [event.split]
				return event
			},
			
			checkForm(formRef) {
				const isValid = this.$refs[formRef].checkValidity()
				return isValid
			},

			okCreate() {
				if (!this.checkForm('createForm')) {
					Dialog.okMessage(this, 'Invalid form')
					return
				}
				else this.createTask(this.selectedEvent)
			},

			async createTask(selectedEvent) {
				for (var user of this.selectedEventSplits) {
					var newTask = new Task(user, selectedEvent.start, selectedEvent.end, selectedEvent.title, selectedEvent.content, selectedEvent.class, selectedEvent.procedures, selectedEvent.background, selectedEvent.allDay)
					this.$store.dispatch(this.moduleName+'/createTask', newTask)
					.then(() => {
						this.showCreateModal = false
					})
					.catch(() => {
						Notif.toastError(this, 'Request failed', 'Could not create the task')
					})
				}
			},

			cancelCreate() {
				this.deleteEventFunction()
			},

			okEdit() {
				if (!this.checkForm('editForm')) {
					Dialog.okMessage(this, 'Invalid form')
					return
				}
				else this.editTask(this.selectedEvent)
			},

			async editTask(selectedEvent) {
				console.log(selectedEvent)
				var editedTask = new Task(selectedEvent.split, selectedEvent.start, selectedEvent.end, selectedEvent.title, selectedEvent.content, selectedEvent.class, selectedEvent.procedures, selectedEvent.background, selectedEvent.allDay)
				editedTask.id = selectedEvent.id
				this.$store.dispatch(this.moduleName+'/updateTask', editedTask)
				.then(() => {
					this.showEventModal = false
				})
				.catch(() => {
					Notif.toastError(this, 'Request failed', 'Could not update the task')
				})
				
			},

			async editTaskInteractive(payload) {
				const selectedEvent = payload.event
				var editedTask = new Task(selectedEvent.split, selectedEvent.start, selectedEvent.end, selectedEvent.title, selectedEvent.content, selectedEvent.class, selectedEvent.procedures, selectedEvent.background, selectedEvent.allDay)
				editedTask.id = selectedEvent.id
				this.$store.dispatch(this.moduleName+'/updateTask', editedTask)
				.then(() => {
					this.showEventModal = false
				})
				.catch(() => {
					Notif.toastError(this, 'Request failed', 'Could not update the task')
				})
				
			},

			async deleteTask(task) {
				this.$store.dispatch(this.moduleName+'/deleteTask', task)
				.then(() => {
					this.$bvModal.hide('eventModal')
				})
				.catch(() => {
					Notif.toastError(this, 'Request failed', 'Could not delete the task')
				})	
			},

			resetSelectedEvent() {
				this.selectedEvent = new Task()
				this.showLinkToInput = false
				this.selectedEventSplits = []
				this.selectedEventEveryday = false

				this.isEditingEvent = false
			},

			selectAndShowCreateModal(event) {
				this.selectedEvent = {...event}
				this.selectedEvent.procedures = []
				this.showCreateModal = true
			},
			openPDF(title) {
				ProcedureService.getFile(title)
				.then(response => {
					const file = new Blob([response.data], {type: "application/pdf"})
					const fileURL = URL.createObjectURL(file)
					return fileURL
				})
				.then(fileURL => {
					window.open(fileURL, title)
				})
			}
		}
	}
</script>

<style>
	ul {
		list-style: none;
		padding-left: 0;
	}

	.font-roboto * {
		font-family: Roboto, sans-serif;
	}

	.hover-translate-right:hover {
		transform: translate(10px, 0);
		transition: transform 200ms ease-in-out;
	}

	.hover-translate-left:hover {
		transform: translate(-10px, 0);
		transition: transform 200ms ease-in-out;
	}

	.vuecal__event-title {
		max-width: 95%;
		overflow: hidden;
	}

	.vuecal__event {
		background-color: #ccc;
		color: black;
		cursor: pointer;
		border-radius: 15px;
		box-shadow: 0 1px 4px navy;
		opacity: 0.9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.vuecal__event.Background {
		background: repeating-linear-gradient(45deg, transparent, transparent 10px, 
			#d2d2d2 10px, #d2d2d2 20px);
		color: #444;
	}

	.vuecal__cell-split { 
		border-right: 1px solid black; 
		border-left: 1px solid black;
	}

	.vuecal__now-line {color: lime;}
</style>
