<template>
	<div class="main-container">
		<h3 class="section-title">Data for <span style="color: darkred">{{ experiment.title }}</span></h3>

		<b-container class="p-0">
			<b-row>
				<b-col>
					<b-form @submit.prevent.stop>
						<b-form-input ref="titleInput" id="titleInput" v-model="sheet.title" placeholder="Textsheet Title" :disabled="!isNew" class="text-center" maxlength="50">
						</b-form-input>
					</b-form>
				</b-col>

				<b-col cols="3" v-if="!enabled && isAllowed('activities.change_textsheet')">
					<b-button @click="enableEdition"  class="float-right"  size="lg" variant="info" style="border-radius: 15px; width: 150px;">
						<b-icon icon="pencil-square"></b-icon>
						Edit
					</b-button>
				</b-col>

				<b-col cols="3" v-if="enabled">
					<b-button @click="okSave" class="float-right" size="lg" variant="info" style="border-radius: 15px; width: 150px;" :disabled="saving">
						<span v-if="!saving"><b-icon icon="cloud-upload" ></b-icon> Save</span>
						<b-spinner type="grow" label="Spinning" v-if="saving"></b-spinner>
					</b-button>
				</b-col>
			</b-row>
		</b-container>

		<b-container style="background-color: #fff; color: black; overflow: hidden; border-radius: 0px 0px 0px 15px" class="p-4">
			<vue-editor ref="editor" v-model="sheet.content" :editorToolbar="customToolbar" :disabled="!enabled" style="height: 1000px;"></vue-editor>
		</b-container>
	</div>
</template>

<style scoped>
	#titleInput {
		border-style: none; 
		border-radius: 15px 15px 0px 0px; 
		background-color: rgba(264, 264, 264, 0.2);
		font-size: 1.8em;
		letter-spacing: 1px;
		color: rgba(264, 264, 264, 1);

	}

	#titleInput:focus {
		font-style: italic;
		color: rgba(264, 264, 264, 0.8);
	}
</style>

<script>
	import { VueEditor } from 'vue2-editor';
	import Textsheet from '../models/Textsheet'
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'
	import Dialog from '../utils/Dialog.js'
	import Notif from '../utils/Notif.js'

	export default {
		components: {
			VueEditor
		},

		data() {
			return {
				sheet: undefined,
				isNew: true,
				enabled: false,
				customToolbar: [
					[{ 'size': ['small', false, 'large', 'huge'] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ 'color': [] }, { 'background': [] }],
					['blockquote', { 'script': 'sub'}, { 'script': 'super' }],
					[{ 'list': 'ordered'}, { 'list': 'bullet' }, {'list': 'check'}],
					[{ 'align': [] }],
					// [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					// [{ 'font': [] }],
					['image', 'link']
				],
				saving: false
			}
		},
		computed: {
			...mapState('user', ['username']),
			...mapGetters('user', ['isAllowed']),
			experiment() {
				return this.$store.getters['experiment/getExperimentByTitle'](this.$route.params.experimentTitle)
			}
		},
		methods: {
			getSheet() {
				const sheetId = this.$route.params.sheetId
				if (sheetId === 'new-entry') {
					this.sheet = new Textsheet(this.experiment.title)
					this.enabled = true
				}
				else {
					try{
						this.sheet = {...this.experiment.data.textsheets.find(textsheet => textsheet.id == this.$route.params.sheetId)}
						this.isNew = false
						this.enabled = false
					} catch(err) {
						console.error(err)
						this.$store.dispatch('displayAlert', { msg: 'Could not find the datasheet you are looking for.', variant: 'warning' })
						this.$router.push('/404')
					}
				}	
			},

			okSave() {
				try {
					if (this.isNew) { 
						this.checkSheet(this.sheet)
						this.createSheet(this.sheet)
					}
					else { this.updateSheet(this.sheet) }
				}
				catch(err) {
					Dialog.okMessage(this, err)
				}
			},

			checkSheet(sheet) {
				if (sheet.title === "") {
					throw 'Please choose a title for your texsheet.'
					}
				for (var textsheet of this.experiment.data.textsheets) {
					if (textsheet.title === sheet.title) {
						throw 'A textsheet with this title already exists. Please choose another title.'
					}
				}
			},

			async createSheet(sheet) {
				this.saving = true

				this.$store.dispatch('experiment/createTextsheet', sheet)
				.then(() => {
					Notif.toastSuccess(this, 'New textsheet saved', 'The new textsheet has been successfully saved.')

					this.$router.go(-1)
				})
				.catch(err => { console.error(err); Notif.toastError(this, 'Could not save', 'The new textsheet could not be saved.') })
				.then(() => this.saving = false)
			},

			async updateSheet(sheet) {
				this.saving = true
				
				this.$store.dispatch('experiment/updateTextsheet', sheet)
				.then(() => {
					Notif.toastSuccess(this, 'Modifications saved', 'Your modifications have been successfully saved.')
				})
				.catch(() => { Notif.toastError(this, 'Could not save', 'Your modifications could not be saved.') })
				.then(() => this.saving = false)	
			},

			enableEdition() {
				this.enabled = true
				const toolbar = document.getElementsByClassName('ql-toolbar')[0]
				toolbar.classList.remove('hidden')
				// const editor = this.$refs.editor
				// editor.focus();
			},

			initToolbar() {
				if (!this.enabled) {
					const toolbar = document.getElementsByClassName('ql-toolbar')[0]
					toolbar.classList.add('hidden')
				}
			}
		},

		created() {
			this.getSheet()
		},
		mounted() {
			this.initToolbar()
		}
	}
</script>

<style>
	.ql-toolbar.hidden {
		display: none
	}
</style>
