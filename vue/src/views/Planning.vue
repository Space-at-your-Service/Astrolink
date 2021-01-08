<template>
	<div class="main-container">
		<h3 class="section-title">My Planning</h3>
		<b-button variant="warning" @click="getTasks">GET TASKS</b-button>
		{{ tasks }}
	</div>
</template>

<script>
	import ProfileService from '../services/ProfileService.js'

	export default {
		components: {
		},
		data() {
			return {
				tasks: undefined
			}
		},
		methods:{
			getTasks() {
				ProfileService.getTasks()
				.then((response) => {
					this.tasks = response.data
				})
			}
		}
	};
</script>