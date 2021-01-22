<template>
	<div class="main-container">
		<h3 class="section-title">Flightplan</h3>

		<Planning :tasks="flightplan"/>
	</div>
</template>

<script>
	import Planning from '../components/Planning.vue';
	import { mapState } from 'vuex'

	export default {
		components: {
			Planning
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState('flightplan', ['flightplan']),
		}
	};
</script>


