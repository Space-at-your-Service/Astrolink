<template>
	<div class="main-container">
		<b-card
		header-tag="header"
		footer-tag="footer"  
		class="text-dark text-center" 
		>
			<template #header>
				<h2 style=" font-variant-caps: small-caps;">{{ experiment.title }}</h2> 
				<span :class="['badge', 'ml-2', {'badge-success': experiment.state === 'complete'}, {'badge-primary': experiment.state === 'planned'}, {'badge-danger': experiment.state === 'aborted'}]">{{experiment.state}}</span>
			</template>

			<b-card-img src="https://www.rrts.com/wp-content/uploads/2018/09/Blue-Background.jpg" alt="Experiment image" height="300px" top>
			</b-card-img>
			
			<b-card-text class="p-3">
				<b-container class="mb-2 py-3">
					<h4>Description</h4>
					{{ experiment.info }}
				</b-container>
				<b-container class="my-2 py-3" style="border-top-style: solid; border-top-width: 1px">
					<h4>Procedure(s)</h4>
					<ul>
						<li v-for="procedure in experiments.procedure"  :key="procedure.nick">
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
								<!-- <li v-for="textsheet in experiment.data.textsheets" :key="textsheet.id">
									<router-link  to="/">
										{{ textsheet.title }}
									</router-link>
								</li> -->
							</ul>
							<router-link :to="'/experiments/'+experiment.title+'/newdata'">
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
	import {mapState} from 'vuex';

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['experiments']),
			experiment() {
				return this.$store.state.experiments.find(experiment => experiment.title = this.$route.params.experimentTitle)
			}
		}
	}
</script>