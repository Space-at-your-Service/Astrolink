<template>
	<div>
		<b-container class="my-3 p-0">
			<b-row class="no-gutters">
				<b-col>
					<b-form-checkbox
						id="eventResizeInput"
						v-model="editionOptions.resize"
						switch
						size="lg"
						>
						Enable event resizing
					</b-form-checkbox>
				</b-col>
			</b-row>
		</b-container>
		<div style="height: 620px; background-color: #fff; color: black; border-radius: 3px; box-shadow: 0px 0px 10px #fff">
			
			<vue-cal ref="vuecal"
				:editable-events="editionOptions"
				:selected-date="new Date()"
				:min-date="minDate"
				:maxDate="maxDate"
				:time-from="6 * 60"
				:time-to="23*60"
				:time-step="30"
				:snap-to-time="5"
				:sticky-split-labels="true"
				:disable-views="['years', 'year', 'month', 'week']"
				hide-view-selector
				show-all-day-events='short'
				today-button
				:watchRealTime="true"
				:timeCellHeight="30"
				:events="events"
				:on-event-click="onEventClick"
				:on-event-create="onEventCreate"
				@event-drag-create="showCreateModal = true"
				:split-days="splitDays"
				class="font-roboto"
				>

				<template v-slot:title="{ title, view }" >
					<span style="font-family: Roboto, sans-serif;"> {{ view.startDate.toLocaleDateString('en-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} </span>
					<strong style="font-family: Roboto, sans-serif; color: navy;">(Mission Day {{ getMissionDayNumber(view.startDate) }} )</strong>
				</template>

				<template v-slot:today-button >
					<b-button variant="warning" size="sm" style="border-style: solid; border-color: black; font-weight: bold; letter-spacing: 1px">
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

					<div class="vuecal__event-title">
						{{ event.title }}
					</div>
					<br/>
					<div class="vuecal__event-time" v-if="event.resizing" style="display:flex; flex-direction: column;">
						<div> From <strong>{{ event.start.formatTime('HH:mm') }} </strong></div>
						<div> To <strong>{{ event.end.formatTime('HH:mm') }} </strong></div>
					</div>
					
				</template>

				<template v-slot:no-event>Nothing yet</template>
			</vue-cal>

			<b-modal id="createModal" title="New task" v-model="showCreateModal" @ok.prevent="okCreate()" @cancel="cancelCreate()" @hidden="resetSelectedEvent" no-close-on-backdrop>
				<form>
					<b-row>
						<b-col>
							<b-form-group 
							label="From"
							label-for="startTimeInput">
								<b-form-timepicker id="startTimeInput" v-model="selectedEventStartTime" minutes-step="5" hide-header no-close-button></b-form-timepicker>
							</b-form-group>
						</b-col>

						<b-col>
							<b-form-group 
							label="To"
							label-for="endTimeInput">
								<b-form-timepicker id="endTimeInput" v-model="selectedEventEndTime" minutes-step="5" hide-header no-close-button></b-form-timepicker>
							</b-form-group>
						</b-col>
					</b-row>

					<b-form-group 
					label="Title"
					label-for="titleInput">
						<b-input id="titleInput" v-model="selectedEvent.title" placeholder="Task name"></b-input>
					</b-form-group>
				
					<b-form-group 
					label="Content"
					label-for="contentInput">
						<b-form-textarea id="contentInput" v-model="selectedEvent.content" placeholder="Task content" rows="5" cols="50"></b-form-textarea>
					</b-form-group>

					<b-form-group 
					label="Category"
					label-for="categoryInput">
						<b-form-select id="categoryInput" :options="eventsCssClasses" v-model="selectedEvent.class">
							<template #first>
								<b-form-select-option value="" disabled>Please select a task category</b-form-select-option>
							</template>
						</b-form-select>
					</b-form-group>

					<b-form-group
					>
						<template #label>
							Performed by
							<br/>
							<b-form-checkbox @change="toggleAllSplits" class="mt-2">
								<strong>Everyone</strong>
							</b-form-checkbox>
						</template>

						<b-form-checkbox-group
						v-model="selectedEventSplits"
						:options="astronautsList"
						inline
						>
						</b-form-checkbox-group>

				</b-form-group>

				<b-form-group
				label="Repeated daily:"
				label-cols="auto">
					<b-form-checkbox v-model="selectedEventEveryday" switch class="mt-2 ml-1">
						{{ selectedEventEveryday ? 'Yes' : 'No' }}
					</b-form-checkbox>
				</b-form-group>
				</form>
			</b-modal>

			<b-modal id="eventModal" title="selectedEvent.title" v-model="showEventModal" @hidden="resetSelectedEvent">
				<form>
					<b-row>
						<b-col>
							<b-form-group 
							label="From"
							label-for="startTimeInput">
								<b-form-timepicker id="startTimeInput" v-model="selectedEventStartTime" minutes-step="5" hide-header no-close-button></b-form-timepicker>
							</b-form-group>
						</b-col>

						<b-col>
							<b-form-group 
							label="To"
							label-for="endTimeInput">
								<b-form-timepicker id="endTimeInput" v-model="selectedEventEndTime" minutes-step="5" hide-header no-close-button></b-form-timepicker>
							</b-form-group>
						</b-col>
					</b-row>

					<b-form-group 
					label="Title"
					label-for="titleInput">
						<b-input id="titleInput" v-model="selectedEvent.title" placeholder="Task name"></b-input>
					</b-form-group>

					<b-form-group 
					label="Content"
					label-for="contentInput">
						<b-form-textarea id="contentInput" v-model="selectedEvent.content" placeholder="Task content" rows="5" cols="50"></b-form-textarea>
					</b-form-group>

					<b-form-group 
					label="Category"
					label-for="categoryInput">
						<b-form-select id="categoryInput" :options="eventsCssClasses" v-model="selectedEvent.class">
							<template #first>
								<b-form-select-option value="" disabled>Please select a task category</b-form-select-option>
							</template>
						</b-form-select>
					</b-form-group>
				</form>
			</b-modal>
		</div>
		{{events}}
		<br/>
		{{selectedEventSplits}}
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'
	import VueCal from 'vue-cal'
	import 'vue-cal/dist/vuecal.css'
	import 'vue-cal/dist/drag-and-drop.js'
	import Task from '../models/task'

	export default {
		components: { VueCal },
		data() {
			return {
				editionOptions: { title: false, drag: true, resize: false, delete: false, create: true },
				selectedEvent: {},
				eventsCssClasses: ['Break', 'Routine', 'IBS', 'OBS', 'Sport', 'External-contact', 'Background'],
				showEventModal: false,
				showCreateModal: false,
				editable: false,
				events: [
					new Task('2020-11-30', '18:00', '2020-11-30', '19:00', 'Test', 'This task is a test', 'IBS', 'Julien')
				],
				astronautsList: ['Julien', 'William', 'Lisbeth', 'Pierre', 'Paul', 'Jacqueline'],
				selectedEventSplits: [],
				selectedEventEveryday: false
			}
		},
		computed: {
			...mapState(['missionStartDate']),
			...mapGetters(['currentAccountRights', 'missionDayNumber']),
			minDate () {
				return new Date().subtractDays(10)
			},
			maxDate () {
				return new Date().addDays(10)
			},
			splitDays() { 
				var splitDays = []
				for (var astronaut of this.astronautsList){
					var splitDay = { id: astronaut, class: astronaut, label: astronaut, hide: false }
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
			toggleAllSplits(checked) {
				this.selectedEventSplits = checked ? this.astronautsList.slice() : []
			},
			getMissionDayNumber(currentDate) {
				return Math.floor((currentDate.getTime() - this.missionStartDate.getTime())/(1000*3600*24))
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
				this.selectedEvent = event
				this.showEventModal = true
			},
			onEventCreate(event, deleteEventFunction) {
				this.selectedEvent = event
				this.deleteEventFunction = deleteEventFunction
				this.selectedEventSplits = [event.split]
				return event
			},
			
			okCreate() {
				var selectedEvent = this.selectedEvent
				if (selectedEvent.class === "Background") selectedEvent.background = true
				var newTask = new Task(selectedEvent.start, selectedEvent.end, selectedEvent.title, selectedEvent.content, selectedEvent.class, selectedEvent.split, selectedEvent.background, selectedEvent.allDay)
				this.events.push(newTask)
				this.showCreateModal = false
			},
			cancelCreate() {
				this.deleteEventFunction()
			},
			resetSelectedEvent() {
				this.selectedEvent = {}
			}
		}

	}
</script>

<style>
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
		border-radius: 10px;
		opacity: 0.8;
		/*display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;*/
	}
	
	.vuecal__event:hover {
		font-weight: bold;
		transition: transform 200ms ease-in-out;
	}

	.vuecal__event.Break {
		background-color: yellow; 
		color: black;
	}
	.vuecal__event.Routine {
		background-color: green; 
		color: #fff;
	}
	.vuecal__event.IBS {
		background-color: blue; 
		color: #fff;
	}
	.vuecal__event.OBS {
		background-color: red; 
		color: #fff;
	}
	.vuecal__event.Sport {
		background-color: purple; 
		color: #fff;
	}
	.vuecal__event.External-contact {
		background-color: orange; 
		color: black;
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

	.vuecal__now-line {color: red;}
</style>
