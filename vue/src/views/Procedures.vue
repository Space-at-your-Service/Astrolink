<template>
	<div class="main-container">
		<h3 class="section-title">Procedures</h3>

		<b-container class="m-0 p-0">
			<b-row class="no-gutters">
				<b-col>
					<b-button v-b-modal.createModal size="lg" variant="info" v-if="permissions.includes('activities.add_procedure')" class="my-3" style="border-radius: 15px">
						<b-icon icon="plus-circle-fill" ></b-icon>
						New procedure
					</b-button>
				</b-col>

				<!-- <b-col>
					<b-form-checkbox
						id="showFavsOnlyInput"
						v-model="showFavsOnly"
						switch
						size="lg"
						class="float-right mt-4"
						disabled
						>
						Show Favorites only
					</b-form-checkbox>
				</b-col> -->
			</b-row>
		</b-container>

		<b-card no-body>
			<b-tabs content-class="my-3" justified active-nav-item-class="font-weight-bold text-uppercase text-dark" card>
				<b-tab v-for="section in procedureSections" :key="section.type" :title="section.type">
				<template #title>
					<strong  style="font-variant-caps: small-caps;">{{ section.type }}</strong>
				</template>

					<b-tabs content-class="my-3" justified small vertical pills>
						<b-tab v-for="subsection in section.subsections" :key="subsection.type">

							<template #title>
								<span  style="font-variant-caps: small-caps;">
								{{ subsection.type }}
								({{ subsection.procedures.length }})
							</span>
							</template>

							<b-container v-for="procedure in subsection.procedures" :key="procedure.nick"
							
							class="text-dark py-2 px-0" style="font-size: 1.3em; border-top-style: solid; border-width: 1px; border-color: #007BFF">
								<b-row no-gutters>
									<b-col :id="procedure.nick+'_file'" class="hover-bg-grey hover-pointer" @click="openPDF(procedure.nick)">
										{{ procedure.title }}
									</b-col>
									<tooltip :target="procedure.nick+'_file'" msg="Open the procedure PDF in a new tab"/>

									<b-col cols=1 :id="procedure.nick+'_info'" class="hover-bg-grey text-center">
										<b-icon icon="info-circle"></b-icon>
									</b-col>
									<b-tooltip :target="procedure.nick+'_info'" triggers="hover" placement="topleft">
										<strong class="text-primary">{{ procedure.title }}</strong>
										<br/>
										{{ procedure.abstract }}
									</b-tooltip>

									<b-col cols=1 :id="procedure.nick+'_fav'" class=" hover-bg-grey hover-pointer text-center"  @click="toggleToFavorites(procedure.nick)">
										<b-icon icon="star" v-if="!favoritesList[procedure.nick]"></b-icon>
										<b-icon icon="star-fill" variant="warning" v-if="favoritesList[procedure.nick]"></b-icon>
									</b-col>
									<tooltip :target="procedure.nick+'_fav'" msg="Add/remove from favorites"/>

									<b-col cols=1 v-b-modal.editModal :id="procedure.nick+'_edit'" class="hover-bg-grey hover-pointer text-center" @click="editModal(procedure)" v-if="permissions.includes('activities.change_procedure')">
										<b-icon icon="pencil-square" variant="info"></b-icon>
									</b-col>
									<tooltip :target="procedure.nick+'_edit'" msg="Edit the procedure"/>
								</b-row>

							</b-container>

									<!-- <b-card-group deck>
										<b-card
										v-for="procedure in subsection.procedures" :key="procedure.nick"
										:id="procedure.nick"
										:title="procedure.title"
										footer-tag="footer"
										header-tag="header"
										class="text-dark text-center m-0 p-0"
										v-b-tooltip.hover
										style="
										min-width: 200px;
										max-width: 500px;"
										>
											<b-card-text>
												{{ procedure.abstract }}
											</b-card-text>

											<template #header>
												<strong style="font-size: larger;">{{ procedure.title }}</strong>
											</template> 

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
													<b-col v-if="permissions.includes('activities.change_procedure')">
														<b-container v-b-modal.editModal @click="editModal(procedure)" class="hover-grow hover-pointer">
															<b-icon icon="pencil-square" variant="info"  
															></b-icon>
														</b-container>
													</b-col>
												</b-row>
											</template>

											<b-tooltip :target="procedure.nick" triggers="hover">
												<strong class="text-info">{{ procedure.title }}</strong><br/>
												{{ procedure.abstract }}
											</b-tooltip>
										</b-card>
									</b-card-group> -->

								<div v-if="subsection.procedures.length === 0" class="text-center text-dark">
									This subsection is empty.
								</div>

						</b-tab>

						<template #tabs-end>
							<b-nav-item v-b-modal.createSubtypeModal disabled><span class="text-dark" style="font-weight: bold; font-variant-caps: small-caps;"><b-icon icon="folder-plus" class="mr-2"></b-icon>new subtype</span></b-nav-item>
						</template>
					</b-tabs>

					<div v-if="section.subsections.length === 0" class="text-center text-dark">
						This section is empty.
					</div>

				</b-tab>

				<b-tab title="Favorites">
					<template #title>
						<b-icon icon="star-fill" variant="warning" class="mr-1"></b-icon>
						<strong  style="font-variant-caps: small-caps;">Favorites</strong>
					</template>

					<div class="container p-0">
						<div class="row no-gutters justify-content-around">
							<div v-for="procedure in procedures" :key="procedure.nick" class="col-4 m-2 text-center">
								<b-card
								v-if="favoritesList[procedure.nick]"
								:id="procedure.nick"
								:title="procedure.title"
								footer-tag="footer"
								header-tag="header"
								class="text-dark m-0 p-0 h-100"
								v-b-tooltip.hover
								style="min-width: 200px"
								>
									<b-card-text>
										{{ procedure.abstract }}
									</b-card-text>

									<!-- <template #header>
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
											<b-col v-if="permissions.includes('activities.change_procedure')">
												<b-container v-b-modal.editModal @click="editModal(procedure)" class="hover-grow hover-pointer">
													<b-icon icon="pencil-square" variant="info"  
													></b-icon>
												</b-container>
											</b-col>
										</b-row>
									</template>
								</b-card>

								<!-- <b-tooltip :target="procedure.nick" triggers="hover">
									<strong class="text-info">{{ procedure.title }}</strong>
									<br/>
									{{ procedure.abstract }}
								</b-tooltip> -->
							</div>
						</div>

						<div v-if="favoritesList.length === 0" class="text-center text-dark">
							Your favorites are empty.
						</div>
					</div>
				</b-tab>
			</b-tabs>
		</b-card>

		<b-modal id="createSubtypeModal" title="New subtype" centered @ok="okCreateSubtype">
			<form>
				<b-form-group
				label="Subtype name"
				label-for="createdSubtypeInput"
				>
					<b-form-input id="createdSubtypeInput" v-model="createdSubtype" trim></b-form-input>
				</b-form-group>
			</form>
		</b-modal>

		<b-modal id="createModal" title="Upload a Procedure" centered @ok="okCreate">
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
					<b-form-select v-model="createdProcedure.type" :options="procedurePrimaryTypes" @change="refreshSubtypesOptions">
						<template #first>
							<b-form-select-option value="" disabled>Please select a procedure type</b-form-select-option>
						</template>
					</b-form-select>
				</b-form-group>

				<b-form-group
				label="Subtype"
				label-for="createdSubtypeInput"
				>
					<b-form-select v-model="createdProcedure.subtype" :options="subtypesOptions" :disabled="!createdProcedure.type">
						<template #first>
							<b-form-select-option value="" disabled>Please select a procedure subtype</b-form-select-option>
						</template>
					</b-form-select>
				</b-form-group>

				<b-form-group
				label="Abstract"
				label-for="createdAbstractInput"
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
					drop-placeholder="Yosh, got it !"
					no-drop-placeholder="Only PDF format is accepted"
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

			<b-button size="sm" variant="danger" @click="deleteProcedure(editedProcedure)" class="ml-1" v-if="permissions.includes('activities.delete_procedure')">
				<b-icon icon="trash"></b-icon>
				Delete procedure
			</b-button>
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
	import Dialog from '../utils/Dialog.js'
	import StringFormat from '../utils/StringFormat.js'
	import Procedure from '../models/procedure.js'
	import tooltip from '../components/tooltip.vue'
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			tooltip
		},
		data() {
			return {
				// procedures: [],
				// procedureSections: [],
				createdProcedure: new Procedure(),
				editedProcedure: new Procedure(),
				subtypesOptions: [],
				isUploading: false,
				fileInfos: [],
				typesColorVariants : [
				{type: 'Logistics', colorVariant: 'dark'},
				{type: 'Contacts', colorVariant: 'warning'},
				{type: 'Emergencies', colorVariant: 'danger'},
				],
				favoritesList: {'test1': true},
				showFavsOnly: false,
				createdSubtype: ""
			}
		},

		computed: {
			...mapState('procedure', ['procedures', 'procedureTypes', 'uploadProgress']),
			...mapState('user', ['permissions']),
			...mapGetters('procedure', {procedureSections: 'proceduresByType', procedurePrimaryTypes: 'procedurePrimaryTypes'}),
			// procedurePrimaryTypes() {
			// 	var procedurePrimaryTypes = []
			// 	for (var type of this.procedureTypes) {
			// 		procedurePrimaryTypes.push(type.primaryType)
			// 	}
			// 	return procedurePrimaryTypes
			// }
		},

		methods: {
			formatProcedure(procedure) {
				let formData = new FormData()
				formData.append('nick', procedure.nick)
				formData.append('title', procedure.title)
				formData.append('type', procedure.type)
				formData.append('subtype', procedure.subtype)
				formData.append('abstract', procedure.abstract)
				formData.append('pdfFile', procedure.file)
				return formData
			},
			editModal(procedure) {
				this.editedProcedure = procedure
			},
			toggleToFavorites(nick) {
				if (nick in this.favoritesList) 
					this.favoritesList[nick] = !this.favoritesList[nick]
				else 
					this.$set(this.favoritesList, nick, true)
			},
			refreshSubtypesOptions() {
				const type = this.procedureTypes.find(type => type.primaryType === this.createdProcedure.type)
				if (type) this.subtypesOptions = type.subtypes
			},
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
				this.createdProcedure.nick = StringFormat.toNick(this.createdProcedure.title)
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
			okCreate() {
				this.generateNick()
				if (!this.checkProcedure(this.createdProcedure)) return
				else this.createProcedure(this.createdProcedure)
			},
			createProcedure(procedure) {
				this.isUploading = true;
				this.$store.dispatch('procedure/createProcedure', procedure)
				.then(() => {
					this.isUploading = false
				})
			},
			okEdit() {
				if (!this.checkProcedure(this.editedProcedure)) return
				else this.editProcedure(this.editedProcedure)
			},
			editProcedure(procedure){
				this.isUploading = true;
				this.$store.dispatch('procedure/updateProcedure', procedure)
				.then(() => {
					this.isUploading = false
				})
			},
			deleteProcedure(procedure) {
				Dialog.confirmDelete(this, 'Do you really want to remove this procedure from the database ?')
				.then((value)=> {
					if (value) {
						this.$store.dispatch('procedure/deleteProcedure', procedure)
						this.$bvModal.hide('editModal')
					}
				})
			},
			okCreateSubtype() {
				return
			},
			reloadProcedures() {
				this.$store.dispatch('getProcedureState')
			}
		}
	}
</script>

<style>

</style>