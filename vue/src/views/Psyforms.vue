<template>
	<div class="main-container">
		<h3 class="section-title">Psychological forms</h3>
		<div class="inner-block mt-3">
			<h3 class="text-center">Form 1</h3>

			<form>
				<b-form-group label="Date" label-for="date">	
					<b-form-input id="date" v-model="dateString" disabled>
					</b-form-input>
				</b-form-group>

				<b-form-group label="First Name" label-for="firstName">	
					<b-form-input id="firstName" v-model="firstName" disabled>
					</b-form-input>
				</b-form-group>

				<b-form-group label="Last Name" label-for="lastName">	
					<b-form-input id="lastName" v-model="lastName" disabled>
					</b-form-input>
				</b-form-group>

				<b-form-group label="How do you feel today ?" label-for="feelToday">

					<div class="container">
						<div class="row justify-content-between">
							<div class="col p-0">bad</div>
							<div class="col text-center">meh</div>
							<div class="col p-0 text-right">good</div>
						</div>
					</div>

					<b-form-input id="feelToday" v-model="feelToday" type="range" min="0" max="10">
					</b-form-input>
				</b-form-group>

				<b-form-group label="Do you feel energetic?" label-for="energetic">

					<div class="container">
						<div class="row justify-content-between">
							<div class="col p-0">no</div>
							<div class="col text-center">meh</div>
							<div class="col p-0 text-right">yes</div>
						</div>
					</div>

					<b-form-input id="energetic" v-model="energetic" type="range" min="0" max="10">
					</b-form-input>
				</b-form-group>

				<b-form-group label="How many pancakes did you eat today ?" label-for="pancakes">	
					<b-form-input id="pancakes" v-model="pancakes" type="number" min="0">
					</b-form-input>
				</b-form-group>

				<b-form-group label="Any remark ?" label-for="remarks">	
					<b-form-textarea id="remarks" v-model="remarks" rows="5" cols="50" placeholder="Have a good day !">
					</b-form-textarea>
				</b-form-group>
			</form>

			<b-button size="lg" variant="dark" block>Submit</b-button>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex";

	export default {
		components: {
		},
		data() {
			return {
				feelToday: '',
				energetic: '',
				pancakes: '',
				remarks: ''
			}
		},
		computed: {
			...mapState(['currentAccount']),
			firstName() {
				// return this.currentAccount.firstName
				return 'admin'
			},
			lastName() {
				// return this.currentAccount.lastName
				return 'admin'
			},
			dateString() {
				const date = new Date()
				const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				return date.toLocaleDateString('en-CH', options)
			}
		}
	}
</script>

<style scoped>

	label {
		font-weight: 500;
		}

	form {
		display: flex;
		justify-content: center;
		flex-direction: column; 
		transition: all .3s;
	}

	.box {
		border-style: solid;
		border-width: 1px;
		border-color: black;
	}

</style>