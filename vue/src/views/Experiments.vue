<template>
	<div class="main-container">
		<h3 class="section-title">Experiments</h3>

		<b-container class="p-0 m-0 text-left">	
			<b-row>
				<b-col cols="sm-4">	
					<b-button variant="info" class="my-3" style="border-radius: 15px;" block size="lg">
						<b-icon icon="plus-circle-fill" class="mr-1"></b-icon>
						New experiment
					</b-button>
				</b-col>
			</b-row>
		</b-container>


		<b-card-group deck>
			<ExperimentCard 
			v-for="experiment in experiments" :key="experiment.index"
			:experiment="experiment"
			/>
		</b-card-group>
		
	</div>
</template>

<script>
import { mapState } from 'vuex';
import ExperimentCard from '../components/ExperimentCard.vue';

export default {
	components: {
		ExperimentCard
	},

	data() {
		return {
		};
	},

	computed: {
		...mapState('experiment', ['experiments'])
	},

	methods: {
		gotoExperimentDetails(experimentTitle) {
			this.$router.push({ path: 'experiments/'+experimentTitle })
		}
	}
};
</script>

