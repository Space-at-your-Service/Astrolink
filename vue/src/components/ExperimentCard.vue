<template>
	<b-card
	header-tag="header" 
	class="text-dark text-center hover-glow" 
	no-body
	style="min-width: 18em; max-width: 30em; margin-bottom: 2em">
		<template #header>
			<span style="font-size: 1.5em; font-variant-caps: all-small-caps;" class="mr-2">{{ experiment.title }}</span> 
			<expBadge :status="experiment.status"/>
		</template>

		<b-card-text class="p-3 hover-pointer" @click="gotoExperimentDetails(experiment.title)">

			<img :src="defaultExperimentLogo" alt="Experiment logo" class="mb-3" width="150px"/><br/>


			{{ experiment.abstract }}
		</b-card-text>
	</b-card>
</template>

<script>
	import expBadge from '../components/expBadge.vue'
	import { mapState } from 'vuex'

	export default {
		name: 'ExperimentCard',
		props: ['experiment'],
		components: { expBadge },
		computed: {
			...mapState('experiment', ['defaultExperimentLogo'])
		},
		methods: {
			gotoExperimentDetails(experimentTitle) {
				this.$router.push({ path: 'experiments/'+experimentTitle })
				console.log("hihi")
			}
		}
	}
</script>