<template>
	<div class="main-container">
		<b-card
		header-tag="header"
		footer-tag="footer"  
		class="text-dark text-center" 
		>
			<template #header>
				<h2 style=" font-variant-caps: small-caps;">{{ experiment.title }}</h2> 
				<expBadge :status="experiment.status"/>
			</template>
			
			<b-card-text class="p-3">
				<b-row>
					<b-col>
						<strong>Supervised by</strong><br/>
						{{ experiment.supervisor }} 
					</b-col>

					<b-col>
						<img :src="defaultExperimentLogo" alt="Experiment logo" class="mb-3" width="250px"/><br/>
					</b-col>
					
					<b-col>
						<strong>Carried by</strong><br/>
						<div v-for="operator in experiment.operators" :key="operator">{{ operator }}</div>
					</b-col>
				</b-row>


				<b-container class="mb-2 py-3">
					<h4>Abstract</h4>
					{{ experiment.abstract }}
				</b-container>

				<b-container class="mb-2 py-3">
					<h4>Description</h4>
					{{ experiment.description }}
				</b-container>

				<b-container class="my-2 py-3" style="border-top-style: solid; border-top-width: 1px">
					<h4>Protocol</h4>
					<ul>
						<li v-for="procedure in experiment.procedures" :key="procedure.nick" @click="openPDF(procedure.title)" class="hover-pointer hover-bg-grey">
							[{{ procedure.type }} > {{ procedure.subtype }}] <strong>{{ procedure.title }}</strong>
						</li>
					</ul>
				</b-container>
				<b-container class="my-2 py-3" style="border-top-style: solid; border-top-width: 1px">
					<h4>Data</h4>
					<b-row>
						<b-col>
							<div v-if="isAllowed('activities.view_textsheet')">
								<h5><b-icon icon="file-earmark-richtext" variant="primary"></b-icon> Textsheets</h5>

								<ul>
									<li v-for="textsheet in experiment.data.textsheets" :key="textsheet.title" class="my-3">
										<router-link :to="'/experiments/'+experiment.title+'/data/textsheets/'+textsheet.id">
											{{ textsheet.title }}
										</router-link><br/>
										<strong>Created:</strong> {{ dateFormat(textsheet.creationDate) }}
										<strong>by:</strong>  {{ textsheet.creator }}<br/>
										<strong>Last modified:</strong> {{ dateFormat(textsheet.lastModifiedDate) }}
										<strong>by:</strong> {{ textsheet.lastUser }}
									</li>
								</ul>
							</div>
							<div>
								<router-link :to="'/experiments/'+experiment.title+'/data/textsheets/new-entry'" v-if="isAllowed('activities.add_textsheet')">
									<b-button class="m-1" variant="primary" size="sm"><b-icon icon="file-earmark-plus"></b-icon> New textsheet</b-button>
								</router-link>
							</div>
						</b-col>
					
						<!-- <b-col cols=6>
							<h5><b-icon icon="file-earmark-spreadsheet" variant="success"></b-icon> Spreadsheets</h5>
							<ul>
								<li v-for="spreadsheet in experiment.data.spreadsheets" :key="spreadsheet.id">
									<router-link  to="/">
										{{ spreadsheet.title }}
									</router-link>
								</li>
							</ul>

							<router-link to="/">
								<b-button class="m-1" variant="success" size="sm" disabled><b-icon icon="file-earmark-plus"></b-icon> New spreadsheet</b-button>
							</router-link>
						</b-col> -->
					</b-row>
				</b-container>
			</b-card-text>

			<template #footer>
				<b-button v-b-modal.editModal variant="info" @click="editModal(experiment)" v-if="isAllowed('activities.change_experiment')"><b-icon icon="pencil-square"></b-icon> Edit</b-button>
			</template>
		</b-card>

		<b-modal id="editModal" title="Experiment edit" centered @ok="okEdit">
			<form>
				<b-form-group>
				
				</b-form-group>
			</form>

			<b-button size="sm" variant="danger" @click="deleteExperiment(editedExperiment)" class="ml-1" v-if="isAllowed('activities.delete_experiment')">
				<b-icon icon="trash"></b-icon>
				Delete experiment
			</b-button>
		</b-modal>

	</div>
</template>

<script>
	import expBadge from '../components/expBadge.vue'
	import ProcedureService from '../services/ProcedureService.js'
	import DateFormat from '../utils/DateFormat.js'
	import Dialog from '../utils/Dialog.js'
	import Notif from '../utils/Notif.js'
	import Experiment from '../models/Experiment.js'
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			expBadge
		},

		data() {
			return {
				editedExperiment: new Experiment()

			}
		},
		computed: {
			...mapState('experiment', ['defaultExperimentLogo']),
			...mapGetters('user', ['isAllowed']),
			experiment() {
				return this.$store.getters['experiment/getExperimentByTitle'](this.$route.params.experimentTitle)
			}
		},
		methods: {
			openPDF(title) {
				ProcedureService.getFile(title)
				.then(response => {
					const file = new Blob([response.data], {type: "application/pdf"})
					const fileURL = URL.createObjectURL(file)
					return fileURL
				})
				.then(fileURL => {
					window.open(fileURL, title)
				})
			},

			dateFormat(rawDate) {
				return DateFormat.dateString(rawDate)
			},

			editModal(experiment) {
				this.editedExperiment = experiment
			},

			okEdit() {

			},

			deleteExperiment(experiment){
				Dialog.confirmDelete(this, 'Do you really want to remove this experiment from the database ?')
				.then((value)=> {
					if (value) {
						this.$store.dispatch('experiment/deleteExperiment', experiment)
						.then(() => {
							this.$bvModal.hide('editModal')
							Notif.toastSuccess(this, 'Experiment deleted', 'The experiment has been successfully deleted.')
							this.$router.go(-1)
						})
						.catch(() => {
							Notif.toastError(this, 'Could not delete', 'Could not delete the experiment.')
						})	
					}
				})
			}
		}
	}
</script>

<style scoped>
	ul {
		list-style: none;
		padding-left: 0;
	}
</style>