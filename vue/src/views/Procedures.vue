<template>
	<div class="main-container">
		<h3 class="section-title">Procedures</h3>

		<b-container fluid class="p-0">
			<b-row class="no-gutters">
				<b-col>
					<b-button v-b-modal.createModal size="lg" variant="info" v-if="isAllowed('activities.add_procedure')" class="my-3" style="border-radius: 15px">
						<b-icon icon="plus-circle-fill" ></b-icon>
						New procedure
					</b-button>
				</b-col>
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

							<b-container v-for="procedure in subsection.procedures" :key="procedure.title" 							class="text-dark py-2 px-0" style="font-size: 1.3em; border-top-style: solid; border-width: 1px; border-color: #007BFF">
								<b-row no-gutters>
									<b-col :id="procedure.title+'_file'" class="hover-bg-grey hover-pointer" @click="openPDF(procedure.title)">
										<strong>{{ procedure.title }}</strong>
									</b-col>
									<tooltip :target="procedure.title+'_file'" msg="Open the procedure PDF in a new tab"/>

									<b-col cols=1 :id="procedure.title+'_info'" class="hover-bg-grey text-center">
										<b-icon icon="info-circle"></b-icon>
									</b-col>
									<b-tooltip :target="procedure.title+'_info'" triggers="hover" placement="topleft">
										<strong class="text-primary">{{ procedure.title }}</strong>
										<br/>
										{{ procedure.abstract }}
									</b-tooltip>

									<b-col cols=1 :id="procedure.title+'_fav'" class=" hover-bg-grey hover-pointer text-center"  @click="toggleToFavorites(procedure)">
										<b-icon icon="star" v-if="!favoriteProcedures.includes(procedure.title)"></b-icon>
										<b-icon icon="star-fill" variant="warning" v-if="favoriteProcedures.includes(procedure.title)"></b-icon>
									</b-col>
									<tooltip :target="procedure.title+'_fav'" msg="Add/remove from favorites"/>

									<b-col cols=1 v-b-modal.editModal :id="procedure.title+'_edit'" class="hover-bg-grey hover-pointer text-center" @click="editModal(procedure)" v-if="isAllowed('activities.change_procedure')">
										<b-icon icon="pencil-square" variant="info"></b-icon>
									</b-col>
									<tooltip :target="procedure.title+'_edit'" msg="Edit the procedure"/>
								</b-row>

							</b-container>

							<div v-if="subsection.procedures.length === 0" class="text-center text-dark">
								This subsection is empty.
							</div>

						</b-tab>

						<!-- <template #tabs-end>
							<b-nav-item v-b-modal.createSubtypeModal disabled><span class="text-dark" style="font-weight: bold; font-variant-caps: small-caps;"><b-icon icon="folder-plus" class="mr-2"></b-icon>new subtype</span></b-nav-item>
						</template> -->
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

					<b-container v-for="procedure in favoriteProceduresObjects" :key="procedure.title" class="text-dark py-2 px-0" style="font-size: 1.3em; border-top-style: solid; border-width: 1px; border-color: #007BFF">
						<b-row no-gutters>
							<b-col :id="procedure.title+'_file_fav'" class="hover-bg-grey hover-pointer" @click="openPDF(procedure.title)">
								[{{ procedure.type }} > {{ procedure.subtype }}] <strong>{{ procedure.title }}</strong>
							</b-col>
							<tooltip :target="procedure.title+'_file_fav'" msg="Open the procedure PDF in a new tab"/>

							<b-col cols=1 :id="procedure.title+'_info_fav'" class="hover-bg-grey text-center">
								<b-icon icon="info-circle"></b-icon>
							</b-col>
							<b-tooltip :target="procedure.title+'_info_fav'" triggers="hover" placement="topleft">
								<strong class="text-primary">{{ procedure.title }}</strong>
								<br/>
								{{ procedure.abstract }}
							</b-tooltip>

							<b-col cols=1 :id="procedure.title+'_fav_fav'" class=" hover-bg-grey hover-pointer text-center"  @click="toggleToFavorites(procedure)">
								<b-icon icon="star" v-if="!favoriteProcedures.includes(procedure.title)"></b-icon>
								<b-icon icon="star-fill" variant="warning" v-if="favoriteProcedures.includes(procedure.title)"></b-icon>
							</b-col>
							<tooltip :target="procedure.title+'_fav_fav'" msg="Add/remove from favorites"/>

							<b-col cols=1 v-b-modal.editModal :id="procedure.title+'_edit_fav'" class="hover-bg-grey hover-pointer text-center" @click="editModal(procedure)" v-if="isAllowed('activities.change_procedure')">
								<b-icon icon="pencil-square" variant="info"></b-icon>
							</b-col>
							<tooltip :target="procedure.title+'_edit_fav'" msg="Edit the procedure"/>
						</b-row>

					</b-container>

					<div v-if="favoriteProcedures.length === 0" class="text-center text-primary">
						<strong>Add</strong> some procedures <strong>to your favorites</strong> to see them here !
					</div>
				</b-tab>
			</b-tabs>
		</b-card>

		<!-- <b-modal id="createSubtypeModal" title="New subtype" centered @ok="okCreateSubtype">
			<form>
				<b-form-group
				label="Subtype name"
				label-for="createdSubtypeInput"
				>
					<b-form-input id="createdSubtypeInput" v-model="createdSubtype" trim></b-form-input>
				</b-form-group>
			</form>
		</b-modal> -->

		<b-modal id="createModal" title="Upload a Procedure" centered @ok.prevent="okCreate" @hidden="resetCreateModal">
			<b-form ref="createForm">

				<b-form-group
				label="Title"
				label-for="createdTitleInput"
				>
					<b-form-input id="createdTitleInput" v-model="createdProcedure.title" trim required></b-form-input>
				</b-form-group>

				<b-form-group
				label="Type"
				label-for="createdTypeInput"
				>
					<b-form-select v-model="createdProcedure.type" :options="procedurePrimaryTypes" @change="refreshSubtypesOptions" required>
						<template #first>
							<b-form-select-option value="" disabled>Select a procedure type</b-form-select-option>
						</template>
					</b-form-select>
				</b-form-group>

				<b-form-group
				label="Subtype"
				label-for="createdSubtypeInput"
				>
					<b-form-select v-model="createdProcedure.subtype" :options="subtypesOptions" :disabled="!createdProcedure.type" required>
						<template #first>
							<b-form-select-option value="" disabled>Select a procedure subtype</b-form-select-option>
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
					required
					>
						<template slot="file-name" slot-scope="{ names }">
							<b-badge v-for="name in names" :key="name" pill variant="dark">{{ name }}</b-badge>
						</template>

					</b-form-file>
				</b-form-group>
			</b-form>
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

			<b-button size="sm" variant="danger" @click="deleteProcedure(editedProcedure)" class="ml-1" v-if="isAllowed('activities.delete_procedure')">
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
	import Notif from '../utils/Notif.js'
	import Procedure from '../models/Procedure.js'
	import tooltip from '../components/tooltip.vue'
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			tooltip
		},
		data() {
			return {
				createdProcedure: new Procedure(),
				editedProcedure: new Procedure(),
				subtypesOptions: [],
				isUploading: false,
				typesColorVariants : [
				{type: 'Logistics', colorVariant: 'dark'},
				{type: 'Contacts', colorVariant: 'warning'},
				{type: 'Emergencies', colorVariant: 'danger'},
				],
				createdSubtype: ""
			}
		},

		computed: {
			...mapState('procedure', ['procedures', 'procedureTypes', 'uploadProgress']),
			...mapState('user', ['favoriteProcedures']),
			...mapGetters('procedure', {procedureSections: 'proceduresByType', procedurePrimaryTypes: 'procedurePrimaryTypes'}),
			...mapGetters('user', ['isAllowed', 'favoriteProceduresObjects'])
		},

		methods: {
			editModal(procedure) {
				this.editedProcedure = procedure
			},

			toggleToFavorites(procedure) {
				console.log(procedure.title)
				this.$store.dispatch('user/toggleToFavorites', procedure)
			},

			refreshSubtypesOptions() {
				const type = this.procedureTypes.find(type => type.primaryType === this.createdProcedure.type)
				if (type) this.subtypesOptions = type.subtypes
			},

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
				.catch(() => {
					Notif.toastError(this, 'Could not open PDF', 'Could not open the PDF you are looking for.')
				})
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

			checkCreateForm() {
				const isValid = this.$refs['createForm'].checkValidity() && this.checkProcedure(this.createdProcedure)
				return isValid
			},

			okCreate() {
				if (!this.checkCreateForm()) {
					Dialog.okMessage(this, 'Invalid form')
					return
				}

				else this.createProcedure(this.createdProcedure)
			},

			createProcedure(procedure) {
				this.isUploading = true;
				this.$store.dispatch('procedure/createProcedure', procedure)
				.then(() => {
					this.$bvModal.hide('createModal')
					Notif.toastSuccess(this, 'Procedure created', 'The procedure has been successfully created.')
				})
				.catch(() => {
					Notif.toastError(this, 'Could not create', 'Could not create the procedure.')
				})
				.then(() => {
					this.isUploading = false
				})
			},

			resetCreateModal() {
				this.createdProcedure = new Procedure()
			},

			okEdit() {
				if (!this.checkProcedure(this.editedProcedure)) return
				else this.editProcedure(this.editedProcedure)
			},

			editProcedure(procedure){
				this.isUploading = true;
				this.$store.dispatch('procedure/updateProcedure', procedure)
				.then(() => {
					Notif.toastSuccess(this, 'Procedure updated', 'The procedure has been successfully updated.')
				})
				.catch(() => {
					Notif.toastError(this, 'Could not update', 'Could not update the procedure.')
				})
				.then(() => {
					this.isUploading = false
				})	
			},

			deleteProcedure(procedure) {
				Dialog.confirmDelete(this, 'Do you really want to remove this procedure from the database ?')
				.then((value)=> {
					if (value) {
						this.$store.dispatch('procedure/deleteProcedure', procedure)
						.then(() => {
							this.$bvModal.hide('editModal')
							Notif.toastSuccess(this, 'Procedure deleted', 'The procedure has been successfully deleted.')
						})
						.catch(() => {
							Notif.toastError(this, 'Could not delete', 'Could not delete the procedure.')
						})	
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