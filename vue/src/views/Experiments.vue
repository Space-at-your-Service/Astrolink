<template>
	<div class="main-container">
		<h3 class="section-title">Experiments</h3>
		<!-- {{experiments}} -->

		<b-container class="p-0 m-0 text-left">	
			<b-row>
				<b-col cols="sm-4">	
					<b-button v-b-modal.createModal variant="info" class="my-3" style="border-radius: 15px;" size="lg">
						<b-icon icon="plus-circle-fill" class="mr-1"></b-icon>
						New experiment
					</b-button>
				</b-col>
			</b-row>
		</b-container>


		<b-card-group deck>
			<ExperimentCard 
			v-for="experiment in experiments" :key="experiment.nick"
			:experiment="experiment"
			/>
		</b-card-group>

		<b-modal id="createModal" title="Upload an Experiment" centered size="lg" @ok="okCreate">
			<form>

				<b-form-group
				label="Title"
				label-for="createdTitleInput"
				>
					<b-form-input id="createdTitleInput" v-model="createdExperiment.title" trim></b-form-input>
				</b-form-group>

				<b-form-group
				label="Supervisor name"
				label-for="createdSupervisorInput"
				>
					<b-form-input id="createdSupervisorInput" v-model="createdExperiment.supervisor"></b-form-input>
				</b-form-group>

				<b-form-group
				label="Abstract"
				label-for="createdAbstractInput"
				>
					<b-form-textarea id="createdAbstractInput" v-model="createdExperiment.abstract" size="sm" no-resize></b-form-textarea>
				</b-form-group>

				<b-form-group
				label="Operators"
				label-for="createdOperatorsInput"
				>
					<b-form-checkbox-group
					id="createdOperatorsInput"
					v-model="createdExperiment.operators"
					:options="astronautsCrew"
					inline
					>
					</b-form-checkbox-group>
				</b-form-group>

				<b-form-group
				label="Procedures"
				label-for="createdTypeInput"
				>
					<b-form-select v-model="createdExperiment.procedures" :options="proceduresAsOptions" multiple :select-size="10">
						<template #first>
							<b-form-select-option value="" disabled>Select one or several experimental procedures</b-form-select-option>
						</template>
					</b-form-select>
				</b-form-group>

				<b-form-group
				label="Detailed description"
				label-for="createdDescriptionInput"
				>
					<b-form-textarea id="createdDescriptionInput" v-model="createdExperiment.description" :rows="4"></b-form-textarea>
				</b-form-group>

				<!-- <b-form-group 
				label="Experiment badge"
				label-for="createdBadgeInput">
					<b-form-file
					id="createdBadgeInput"
					v-model="createdExperiment.badge"
					accept="image/*"
					size="md"
					placeholder="Drop the image file here"
					drop-placeholder="It looks beautiful !"
					no-drop-placeholder="Only image formats are accepted"
					>
						<template slot="file-name" slot-scope="{ names }">
							<b-badge v-for="name in names" :key="name" pill variant="dark">{{ name }}</b-badge>
						</template>

					</b-form-file>
				</b-form-group> -->
			</form>
		</b-modal>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import Experiment from '../models/Experiment.js'
import ExperimentCard from '../components/ExperimentCard.vue';

export default {
	components: {
		ExperimentCard
	},

	data() {
		return {
			createdExperiment: new Experiment()
		};
	},

	computed: {
		...mapState(['astronautsCrew']),
		...mapState('experiment', ['experiments']),
		...mapGetters('procedure', ['proceduresAsOptions'])
	},

	methods: {
		gotoExperimentDetails(experimentTitle) {
			this.$router.push({ path: 'experiments/'+experimentTitle })
		},
		checkExperiment() {
			return true
		},
		okCreate() {
				if (!this.checkExperiment(this.createdExperiment)) return
				else this.createExperiment(this.createdExperiment)
		},
		createExperiment(experiment) {
			this.isUploading = true;
			this.$store.dispatch('experiment/createExperiment', experiment)
			.then(() => {
				this.isUploading = false
			})
		},
	}
}
</script>

