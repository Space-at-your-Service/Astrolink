<template>
	<div>
					<b-pagination-nav :link-gen="linkGen" use-router v-model="currentPage" :number-of-pages="pageCount" first-number last-number size="lg" class="m-auto">
					</b-pagination-nav>
					{{currentPage}} / {{pageCount}}
		<pdf :src="url" :page="currentPage" @num-pages="pageCount = $event" @page-loaded="currentPage = $event"></pdf>
	</div>
</template>

<script>
	import pdf from 'vue-pdf'

	export default {
		props: ['url'],
		components: {
			pdf
		},
		data() {
			return {
				currentPage: 1,
				pageCount: 1,
			}
		},
		methods: {
			linkGen() {
				return '/procedures'
			}
		}
	}
</script>