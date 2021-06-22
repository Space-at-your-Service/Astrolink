<template>
	<div class="main-container">
		<h3 class="section-title">Flightplan</h3>

		<Planning :tasks="flightplan" :eventsCssClasses="categories" :userList="astronautsCrew" :userNames="astronautsNames" moduleName='flightplan' :planningPermissions="planningPermissions"/>
	</div>
</template>

<script>
	import Planning from '../components/Planning.vue';
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			Planning
		},
		data() {
			return {
					categories: ['Break', 'Routine', 'Preparation', 'IBS', 'OBS', 'Data-analysis', 'Sport', 'External-contact'],
					planningPermissions: {
						view: ['activities.view_task'], 
						create: ['activities.add_task', 'activities.touch_flightplan'], 
						edit: ['activities.change_task', 'activities.touch_flightplan'], 
						delete: ['activities.delete_task', 'activities.touch_flightplan']
					}
			}
		},
		computed: {
			...mapGetters(['astronautsCrew']),
			...mapState('flightplan', ['flightplan']),

			astronautsNames() {
				return this.$store.getters['listUsernames']('astronauts')
			},
		}
	};
</script>

<style>
	.vuecal__event.Break {
		background-color: yellow; 
		color: black;
	}
	.Break {
		background-color: yellow; 
		color: black;
	}
	.vuecal__event.Routine {
		background-color: green; 
		color: #fff;
	}
	.Routine {
		background-color: green; 
		color: #fff;
	}
	.vuecal__event.Preparation {
		background-color: cyan; 
		color: black;
	}
	.Preparation {
		background-color: cyan; 
		color: black;
	}
	.vuecal__event.IBS {
		background-color: blue; 
		color: #fff;
	}
	.IBS {
		background-color: blue; 
		color: #fff;
	}
	.vuecal__event.OBS {
		background-color: red; 
		color: #fff;
	}
	.OBS {
		background-color: red; 
		color: #fff;
	}
	.vuecal__event.Data-analysis {
		background-color: coral; 
		color: #fff;
	}
	.Data-analysis {
		background-color: coral; 
		color: #fff;
	}
	.vuecal__event.Sport {
		background-color: purple; 
		color: #fff;
	}
	.Sport {
		background-color: purple; 
		color: #fff;
	}
	.vuecal__event.External-contact {
		background-color: orange; 
		color: black;
	}
	.External-contact {
		background-color: orange; 
		color: black;
	}
</style>


