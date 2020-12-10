<template>
	<div class="main-container">
		<div style="height: 620px; background-color: #fff; color: black; border-radius: 3px; overflow: auto;">
			<vue-editor v-model="datasheet.content" @imageAdded="handleImageAdded" :editorToolbar="customToolbar" style="height: 1000px;"></vue-editor>
		</div>
		<b-button variant="info" block @click="saveContent">Save content</b-button>
		{{ datasheet.content }}
	</div>
</template>

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

