<template>
	<div class="main-container">
		<h3 class="section-title">Procedures</h3>
		<div class="container my-3 p-0 text-left">
			<b-row class="no-gutters">
				<b-col>
					<b-button v-b-modal.uploadModal size="md">
						<b-icon icon="plus-square" class="mr-1"></b-icon>
						New procedure
					</b-button>
				</b-col>

				<b-col>
					<b-form-checkbox
						id="showFavsOnlyInput"
						v-model="showFavsOnly"
						>
						Show Favorites only
					</b-form-checkbox>
				</b-col>
			</b-row>
		</div>

		<b-card no-body>
			<b-tabs content-class="my-3" justified>
				<b-tab v-for="section in proceduresByType" :key="section.type" :title="section.type">
					<div class="container p-0">
						<div class="row no-gutters justify-content-around">
							<div v-for="procedure in section.procedures" :key="procedure.nick" class="col-3 m-2 text-center">
								<b-card
								v-if="!showFavsOnly || favoritesList[procedure.nick]"
								:id="procedure.nick"
								:title="procedure.title"
								footer-tag="footer"
								header-tag="header"
								class="text-dark m-0 p-0 h-100"
								v-b-tooltip.hover
								>
									<b-card-text>
										{{ procedure.abstract }}
									</b-card-text>

								<!-- 	<template #header>
										<strong style="font-size: larger;">{{ procedure.title }}</strong>
									</template> -->

									<template #footer>
										<b-row>
											<b-col>
												<b-container class="hover-grow hover-pointer" @click="toggleToFavorites(procedure.nick)">
													<b-icon icon="star" v-if="!favoritesList[procedure.nick]"></b-icon>
													<b-icon icon="star-fill" variant="warning" v-if="favoritesList[procedure.nick]"></b-icon>
												</b-container>
											</b-col>
											<b-col>
												<b-container class="hover-grow hover-pointer" @click="openPDF(procedure.nick)">
													<b-icon icon="eye-fill" variant="dark"></b-icon>
												</b-container>
											</b-col>
											<b-col >
												<b-container v-b-modal.editModal @click="editModal(procedure)" class="hover-grow hover-pointer">
													<b-icon icon="pencil-square" variant="info"  
													></b-icon>
												</b-container>
											</b-col>
										</b-row>
									</template>
								</b-card>

								<b-tooltip :target="procedure.nick" triggers="hover">
									<strong class="text-info">{{ procedure.title }}</strong>
									<br/>
									{{ procedure.abstract }}
								</b-tooltip>
							</div>

							<div v-if="section.procedures.length === 0" class="text-center text-dark">
								This section is empty.
							</div>
						</div>
					</div>
				</b-tab>
			</b-tabs>
		</b-card>

		<b-modal id="uploadModal" title="Procedure Upload" centered @ok="okUpload">
			<form>

				<b-form-group
				label="Title"
				label-for="createdTitleInput"
				>
					<b-form-input id="createdTitleInput" v-model="createdProcedure.title" trim></b-form-input>
				</b-form-group>

				<b-form-group
				label="Type"
				label-for="createdTypeInput"
				>
					<b-form-select v-model="createdProcedure.type" :options="procedureTypes">
						<template #first>
							<b-form-select-option value="" disabled>Please select a procedure type</b-form-select-option>
						</template>
					</b-form-select>
				</b-form-group>

				<b-form-group
				label="Abstract"
				label-for="createdDetailsInput"
				>
					<b-form-textarea id="createdAbstractInput" v-model="createdProcedure.abstract" size="sm" no-resize></b-form-textarea>
				</b-form-group>

				<b-form-group 
				label="File"
				label-for="createdFileInput">
					<b-form-file
					id="createdFileInput"
					v-model="createdProcedure.file"
					accept=".pdf"
					size="md"
					placeholder="Drop the procedure PDF file here"
					drop-placeholder="Drop it !"
					no-drop-placeholder="Only PDF files are accepted"
					>
						<template slot="file-name" slot-scope="{ names }">
							<b-badge v-for="name in names" :key="name" pill variant="dark">{{ name }}</b-badge>
						</template>

					</b-form-file>
				</b-form-group>
			</form>
		</b-modal>

		<b-modal id="editModal" title="Procedure Edit" centered @ok="okEdit">
			<form>
				<b-form-group 
				label="File"
				label-for="editedFileInput">
					<b-form-file
					id="editedFileInput"
					v-model="editedProcedure.file"
					accept=".pdf"
					size="md"
					placeholder="Drop the procedure PDF file here"
					drop-placeholder="Drop it !"
					no-drop-placeholder="Only PDF files are accepted"
					>
						<template slot="file-name" slot-scope="{ names }">
							<b-badge v-for="name in names" :key="name" pill variant="dark">{{ name }}</b-badge>
						</template>

					</b-form-file>
				</b-form-group>
			</form>
		</b-modal>

		<b-progress v-if="isUploading" max="100" variant="primary" show-progress animated>
			<b-progress-bar :value="uploadProgress">
				{{ uploadProgress }}%
			</b-progress-bar>
		</b-progress>
	</div>
</template>

<script>
	import ProcedureService from '../services/ProcedureService'
	import {mapState} from 'vuex'

	export default {
		components: {
		},
		data() {
			return {
				sectionList: ['Section 1', 'Section 2', 'Section 3', 'Section 4'],
				selected: "section1",
				procedures: [],
				proceduresByType: [],
				createdProcedure: {nick: '', title: '', type: '', abstract: '', file: undefined},
				editedProcedure: {nick: '', title: '', type: '', abstract: '', file: undefined},
				isUploading: false,
				uploadProgress: 0,
				fileInfos: [],
				fileURL: '',
				typesColorVariants : [
				{type: 'Logistics', colorVariant: 'dark'},
				{type: 'Contacts', colorVariant: 'warning'},
				{type: 'Emergencies', colorVariant: 'danger'},
				],
				favoritesList: {'test': true},
				showFavsOnly: false
			}
		},
		computed: {
			...mapState(['procedureTypes']),
			formattedProcedure() {
				let formData = new FormData()
				formData.append('nick', this.createdProcedure.nick)
				formData.append('title', this.createdProcedure.title)
				formData.append('type', this.createdProcedure.type)
				formData.append('abstract', this.createdProcedure.abstract)
				formData.append('pdfFile', this.createdProcedure.file)
				return formData
			}
		},
		methods: {
			editModal(procedure) {
				this.editedProcedure = procedure
			},
			toggleToFavorites(nick) {
				if (nick in this.favoritesList) 
					this.favoritesList[nick] = !this.favoritesList[nick]
				else 
					this.$set(this.favoritesList, nick, true)
			},
			splitProceduresByType() {
				this.proceduresByType = []
				for (var type of this.procedureTypes) {
					var colorVariant = 'primary'
					var pair = this.typesColorVariants.find(pair => pair.type === type)
					if (pair) {
						colorVariant = pair.colorVariant
					}

					var proceduresOfType = this.procedures.filter(procedure => procedure.type === type)

					var section = {type: type, colorVariant: colorVariant, procedures: proceduresOfType}
					this.proceduresByType.push(section)
				}
			},
			// getFileURL(nick) {
			// 	ProcedureService.getFile(nick)
			// 	.then(response => {
			// 		const file = new Blob([response.data])
			// 		const fileURL = URL.createObjectURL(file)
			// 		return fileURL
			// 	})
			// },
			openPDF(nick) {
				ProcedureService.getFile(nick)
				.then(response => {
					const file = new Blob([response.data], {type: "application/pdf"})
					const fileURL = URL.createObjectURL(file)
					return fileURL
				})
				.then(fileURL => {
					window.open(fileURL, '__blank')
				})
			},
			generateNick() {
				this.createdProcedure.nick = this.createdProcedure.title
				.toLowerCase()
				.replace(/ /g, "-");
			},
			checkTitle(procedure) {
				return (procedure.title.length > 0)
			},
			checkAbstract(procedure) {
				return (procedure.title.length >= 0)
			},
			checkProcedure(procedure) {
				if (procedure.abstract === '') {
					if (this.checkTitle(procedure)) {
						procedure.abstract = 'No abstract provided.'
						return true
					}
					else return false
				}
				else return (this.checkTitle(procedure) && this.checkAbstract(procedure))
			},
			okUpload() {
				this.generateNick()
				if (!this.checkProcedure(this.createdProcedure)) return
				else this.fileUpload()
			},
			fileUpload() {
				this.progress = 0
				this.isUploading = true;
				ProcedureService.uploadProcedure(this.formattedProcedure, event => {
					this.uploadProgress = Math.round((100*event.loaded) / event.total)
				})
				.then(() => {
					this.refreshProcedures()
				})
				.catch(() => {
					alert("An error occured during file upload.")
				})
				.then(() => {
					this.isUploading = false
					this.uploadProgress = 0
				})
				
			},
			refreshProcedures() {
				this.getProceduresFromServer()
			},
			getProceduresFromServer() {
				ProcedureService.getProcedures()
				.then(response => {
					this.procedures = response.data
					this.splitProceduresByType()
				})
				.catch(e => {
					console.log(e)
				})
			}
		},
		beforeMount() {
			this.getProceduresFromServer()
		}
	}
</script>

<style>

</style>