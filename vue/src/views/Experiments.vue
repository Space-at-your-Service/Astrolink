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

				<b-card-img src="https://www.rrts.com/wp-content/uploads/2018/09/Blue-Background.jpg" alt="Experiment image" height="150px" top class="hover-pointer" @click="gotoExperimentDetails(experiment.title)">
				</b-card-img>
				
				<b-card-text class="p-3 hover-pointer" @click="gotoExperimentDetails(experiment.title)">
					{{ experiment.info }}
				</b-card-text>

				<template #header>
					<span style="font-size: 1.5em; font-variant-caps: all-small-caps;">{{ experiment.title }}</span> 
					<span :class="['badge', 'ml-2', {'badge-success': experiment.state === 'complete'}, {'badge-primary': experiment.state === 'planned'}, {'badge-danger': experiment.state === 'aborted'}]">{{experiment.state}}</span>
				</template>
			</b-card>
		</b-card-group>
		
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	components: {
	},

	data() {
		return {
			editorContent: ''
		};
	},
	computed: {
		...mapState(['experiments'])
	},
	methods: {
		expand(index) {
			this.expanded[index] = !this.expanded[index];
			console.log(this.expanded);
			// experiment.expanded = !experiment.expanded;
			// console.log(experiment.expanded)
		},
		gotoExperimentDetails(experimentTitle) {
			this.$router.push({ path: 'experiments/'+experimentTitle })
		}
	}
};
</script>

