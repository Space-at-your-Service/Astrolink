// Store module that contains the audios .

import AudioService from '../services/AudioService.js'

export const audio = {
	namespaced: true,

	state: {
		audios: [],
	},

	getters: {
	},

	mutations: {

		SET_STATE(state, payload) {
			state.audios = payload
		},

		CREATE_SUCCESS(state, payload) {
			const audio = {...payload}
			state.audios.push(audio)
		},

	},

	actions: {
		async getAudiosState({ commit }) {
			var payload = undefined
			return AudioService.getAudios()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				//console.log('audios loaded')
			})
			.catch(err => {
				console.log('loading error (audios)')
				throw err
			})
		},

		async createAudio({ commit, state }, audio) {
			const formData = new FormData()
			formData.append('user', audio.user)
			formData.append('rooms', audio.rooms)
			formData.append('audiofile', audio.file)

			return AudioService.postAudio(formData, event => { state.uploadProgress = Math.round((100*event.loaded) / event.total) })
			.then(() => { 
				commit('CREATE_SUCCESS', audio)
				state.uploadProgress = 0
				console.log('audio ' + audio+ ' created') 
			})
		},
	


		async getAudios({ commit }) {
			var payload = undefined
			return AudioService.getAudios()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				//console.log('audios loaded')
			})
			.catch(err => {
				console.log('loading error (communication)')
				throw err
			})
		},

	}
}