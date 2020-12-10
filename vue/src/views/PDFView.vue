<template>
	<div class="main-container">
		<b-pagination-nav :link-gen="linkGen" use-router v-model="currentPage" :number-of-pages="pageCount" first-number last-number size="lg" class="m-auto">
		</b-pagination-nav>
		<pdf :src="fileURL" :page="currentPage" @num-pages="pageCount = $event" @page-loaded="currentPage = $event"></pdf>
		<div class="text-center">
			{{currentPage}} / {{pageCount}}
		</div>
	</div>
</template>

<script>
	import pdf from 'vue-pdf'
	import ProcedureService from '../services/ProcedureService'

	export default {
		components: {
			pdf
		},
		data() {
			return {
				currentPage: 1,
				pageCount: 1,
				fileURL: ''
			}
		},
		computed: {
			nick() {
				return this.$route.params.procedureNick
			}			
		},
		methods: {
			linkGen() {
				return "/procedures/pdfview/"+this.nick
			},
			getFileURL() {
				ProcedureService.getFile(this.nick)
				.then(response => {
					let file = new Blob([response.data], {type: "application/pdf"})
					this.fileURL = URL.createObjectURL(file)

					var fileLink = document.createElement('a');
					window.open(this.fileURL, '__blank')
                    fileLink.href = this.fileURL;
                    fileLink.setAttribute('target', '__blank');
                    document.body.appendChild(fileLink);
   
                    fileLink.click();
				})
			}
		},
		beforeMount() {
			this.getFileURL()
			console.log(this.nick)
		}
	}
</script>