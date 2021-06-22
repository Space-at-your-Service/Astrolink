<template>
	<div class="main-container">
		<h3 class="section-title">MCC Planning</h3>

		<Planning :tasks="mccPlanning" :eventsCssClasses="categories" :userList="staff.mcc" :userNames="mccNames" moduleName='mccplanning' :planningPermissions="planningPermissions"/>
	</div>
</template>

<script>
	import Planning from '../components/Planning.vue'
	import { mapState } from 'vuex'

	export default {
		components: {
			Planning
		},
		
		data() {
			return {
				categories: ['Shift-tasks', 'Briefing-debriefing', 'Change-of-shift', 'Meal'],
				planningPermissions: {
					view: ['activities.view_task'], 
					create: ['activities.add_task'], 
					edit: ['activities.change_task'], 
					delete: ['activities.delete_task']
				}
				
			}
		},

		computed: {
			...mapState('mccplanning', ['mccPlanning']),
			...mapState(['staff']),

			mccNames() {
				return this.$store.getters['listUsernames']('mcc')
			}
		},

		methods: {
			
		}
	};
</script>

<style>
	.vuecal__event.Shift-tasks {
		background-color: blue; 
		color: #fff;
	}
	.Shift-tasks {
		background-color: blue; 
		color: #fff;
	}
	.vuecal__event.Briefing-debriefing {
		background-color: cyan; 
		color: black;
	}
	.Briefing-debriefing {
		background-color: cyan; 
		color: black;
	}
	.vuecal__event.Change-of-shift {
		background-color: red; 
		color: black;
	}
	.Change-of-shift {
		background-color: red; 
		color: black;
	}
	.vuecal__event.Meal {
		background-color: green; 
		color: black;
	}
	.Meal {
		background-color: green; 
		color: black;
	}
</style>