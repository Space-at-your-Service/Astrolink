<template>
	<div class="main-container">
		<h3 class="section-title">Experiments</h3>

		<div class="container p-0 text-left">		
			<b-button variant="info" class="my-3" style="border-radius: 15px;">
				<b-icon icon="plus-circle-fill" class="mr-1"></b-icon>
				New experiment
			</b-button>
		</div>


		<b-card-group deck>
			<b-card v-for="experiment in experiments" 
			:key="experiment.index" 
			header-tag="header" 
			class="text-dark text-center hover-glow" 
			no-body>
				<template #header>
					<span style="font-size: 1.5em; font-variant-caps: all-small-caps;">{{ experiment.title }}</span> 
					<span :class="['badge', 'ml-2', {'badge-success': experiment.state === 'complete'}, {'badge-primary': experiment.state === 'planned'}, {'badge-danger': experiment.state === 'aborted'}]">{{experiment.state}}</span>
				</template>

				<b-card-text class="p-3 hover-pointer" @click="gotoExperimentDetails(experiment.title)">
					<img src="../assets/mission_badge.png" alt="Experiment badge" class="mb-3"/><br/>

					{{ experiment.info }}
				</b-card-text>
			</b-card>
		</b-card-group>
		
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	components: {
	},

	data() {
		return {
		};
	},
	computed: {
		...mapState(['experiments'])
	},
	methods: {
		gotoExperimentDetails(experimentTitle) {
			this.$router.push({ path: 'experiments/'+experimentTitle })
		}
	}
};
</script>

