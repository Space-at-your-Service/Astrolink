<template>
	<div class="main-container">
		<b-card
		header-tag="header"
		footer-tag="footer"  
		class="text-dark text-center" 
		>

			<b-card-img src="https://www.rrts.com/wp-content/uploads/2018/09/Blue-Background.jpg" alt="Experiment image" height="300px" top>
			</b-card-img>
			
			<b-card-text class="p-3">
				<h4>Description</h4>
				{{ experiment.info }}

				<h4>Protocol</h4>
				<router-link  to="/">
							Procedure title	
				</router-link>

				<h4>Data</h4>
				<div>
					<router-link v-for="datasheet in experiment.datasheets" :key="datasheet.id" to="/experiments/exper">
						<b-button variant="info" class="m-1" >Datasheet {{ datasheet.id }}</b-button>
					</router-link>
				</div>
			</b-card-text>

			<template #header>
				<h1 style=" font-variant-caps: all-small-caps;">{{ experiment.title }}</h1> 
				<span :class="['badge', 'ml-2', {'badge-success': experiment.state === 'complete'}, {'badge-primary': experiment.state === 'planned'}, {'badge-danger': experiment.state === 'aborted'}]">{{experiment.state}}</span>
			</template>

			<template #footer>
				<router-link v-for="datasheet in experiment.datasheets" :key="datasheet.id" :to="'/experiments/'+experiment.title+'/newdata'">
					<b-button variant="info" class="m-1" >Datasheet {{ datasheet.id }}</b-button>
				</router-link>
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