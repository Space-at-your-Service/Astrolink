<template>
	<b-card
	header-tag="header" 
	class="text-dark text-center hover-glow" 
	no-body
	style="min-width: 18em; margin-bottom: 2em">
		<template #header>
			<span style="font-size: 1.5em; font-variant-caps: all-small-caps;">{{ experiment.title }}</span> 
			<span :class="['badge', 'ml-2', {'badge-success': experiment.state === 'complete'}, {'badge-primary': experiment.state === 'planned'}, {'badge-danger': experiment.state === 'aborted'}]">{{experiment.state}}</span>
		</template>

		<b-card-text class="p-3 hover-pointer" @click="gotoExperimentDetails(experiment.title)">
			<img src="../assets/mission_badge.png" alt="Experiment badge" class="mb-3"/><br/>

			{{ experiment.info }}
		</b-card-text>
	</b-card>
</template>

<script>
	export default {
		name: 'ExperimentCard',
		props: ['experiment'],

		methods: {
			gotoExperimentDetails(experimentTitle) {
				this.$router.push({ path: 'experiments/'+experimentTitle })
			}
		}
	}
</script>