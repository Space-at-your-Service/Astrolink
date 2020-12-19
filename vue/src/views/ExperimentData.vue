<template>
	<div class="main-container">
		<b-container class="p-0">
			<b-row>
				<b-col cols=10>
					<form>
						<b-form-input id="titleInput" v-model="title" placeholder="Textsheet Title" class="text-center">
						</b-form-input>
					</form>
				</b-col>

				<b-col>
					<b-button @click="saveContent" class="float-right" size="lg" variant="info" style="border-radius: 15px"><b-icon icon="cloud-upload" ></b-icon> Save</b-button>
				</b-col>
			</b-row>
		</b-container>

		<b-container style="background-color: #fff; color: black; overflow: hidden; border-radius: 0px 0px 0px 15px" class="p-4">
			<vue-editor v-model="datasheet.content" @imageAdded="handleImageAdded" :editorToolbar="customToolbar" style="height: 1000px;"></vue-editor>
		</b-container>
		<!--  -->
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
	import {VueEditor} from 'vue2-editor';
	import {axios} from 'axios';
	import Datasheet from '../models/datasheet'

	export default {
		components: {
			VueEditor
		},

		data() {
			return {
				datasheet: new Datasheet(),
				title: "Textsheet Title",
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
				]
			}
		},
		computed: {
			experiment() {
				return this.$store.state.experiments.find(experiment => experiment.title = this.$route.params.experimentTitle)
			}
		},
		methods: {
			handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				var formData = new FormData();
				formData.append('image', file)

				axios({
					url: 'https://fakeapi.yoursite.com/images',
					method: 'POST',
					data: formData
				})
				.then(result => {
					console.log(result.data)
					let url = result.data.url // Get url from response
					Editor.insertEmbed(cursorLocation, 'image', url);
					resetUploader();
				})
				.catch(err => {
					console.log(err);
				})
			},
			saveContent() {
				console.log('saved')
			}
		}
	}
</script>

