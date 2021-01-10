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
				<img src="../assets/img/mission_badge.png" alt="Experiment badge" class="mb-3"/><br/>

				<b-container class="mb-2 py-3">
					<h4>Abstract</h4>
					{{ experiment.abstract }}
				</b-container>

				<b-container class="mb-2 py-3">
					<h4>Description</h4>
					{{ experiment.description }}
				</b-container>

				<b-container class="my-2 py-3" style="border-top-style: solid; border-top-width: 1px">
					<h4>Procedure(s)</h4>
					<ul>
						<li v-for="procedure in experiment.procedures"  :key="procedure.nick">
							<router-link  to="/">
								{{ procedure.title }}
							</router-link>
						</li>
					</ul>
				</b-container>
				<b-container class="my-2 py-3" style="border-top-style: solid; border-top-width: 1px">
					<h4>Data</h4>
					<b-row>
						<b-col cols=6>
							<h5><b-icon icon="file-earmark-richtext" variant="primary"></b-icon> Textsheets</h5>
							<ul>
								<li v-for="textsheet in experiment.data.textsheets" :key="textsheet.title" class="my-3">
									<router-link :to="'/experiments/'+experiment.title+'/data/textsheets/'+textsheet.title">
										{{ textsheet.title }}
									</router-link><br/>
									<strong>Created:</strong> {{ textsheet.creationDate }}
							<strong>by:</strong>  {{ textsheet.creator }}<br/>
							<strong>Last modified:</strong> {{textsheet.lastModifiedDate }}
							<strong>by:</strong> {{ textsheet.lastUser }}
								</li>
							</ul>
							<router-link :to="'/experiments/'+experiment.title+'/data/textsheets/new-entry'">
								<b-button class="m-1" variant="primary" size="sm"><b-icon icon="file-earmark-plus"></b-icon> New textsheet</b-button>
							</router-link>
						</b-col>
					
						<b-col cols=6>
							<h5><b-icon icon="file-earmark-spreadsheet" variant="success"></b-icon> Spreadsheets</h5>
							<ul>
								<!-- <li v-for="spreadsheet in experiment.data.spreadsheets" :key="spreadsheet.id">
									<router-link  to="/">
										{{ spreadsheet.title }}
									</router-link>
								</li> -->
							</ul>

							<router-link to="/">
								<b-button class="m-1" variant="success" size="sm" disabled><b-icon icon="file-earmark-plus"></b-icon> New spreadsheet</b-button>
							</router-link>
						</b-col>
					</b-row>
				</b-container>
			</b-card-text>

			<template #footer>
				<b-button variant="info" disabled><b-icon icon="pencil-square"></b-icon> Edit</b-button>
			</template>
		</b-card>
	</div>
</template>

<script>
	import expBadge from '../components/expBadge.vue'

	export default {
		components: {
			expBadge
		},

		data() {
			return {

			}
		},
		computed: {
			experiment() {
				return this.$store.getters['experiment/getExperimentByTitle'](this.$route.params.experimentTitle)
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