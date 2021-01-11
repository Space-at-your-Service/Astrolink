<template>
	<div class="main-container">
		<h3 class="section-title">My Planning</h3>
		{{ planning }}
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		components: {
		},
		
		data() {
			return {
				
			}
		},

		computed: {
			...mapState('user', ['planning'])
		},

		methods: {
			
		}
	};
</script>