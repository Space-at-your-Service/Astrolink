// Store module that contains experiments, including datasheets

import ExperimentService from '../services/ExperimentService.js'

export const experiment = {
	namespaced: true,

	state: {
		experiments: [],
		statusOptions: ['planned', 'ongoing', 'complete', 'aborted'],
		defaultExperimentLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_program_insignia.png"
	},

	getters: {
		getExperimentByTitle: (state) => (title) => {
			return state.experiments.find(experiment => experiment.title === title)
		}
	},

	mutations: {
		SET_STATE(state, payload) {
			state.experiments = payload
		},

		CREATE_SUCCESS(state, payload) {
			const experiment = {...payload}
			state.experiments.push(experiment)
		},

		DELETE_SUCCESS(state, payload) {
			const index = state.experiments.indexOf(payload)
			if (index > -1) {
				state.experiments.splice(index, 1)
			}
		},

		UPDATE_SUCCESS(state, payload) {
			const title = payload.title
			const index = state.experiments.findIndex(experiment => { return experiment.title === title })
			console.log(state.experiments[index])
			if (index > -1) {
				state.experiments.splice(index, 1)

				const experiment = {...payload}
				state.experiments.push(experiment)
			}
		}
	},

	actions: {
		async getExperimentState({ commit }) {
			var payload = undefined
			return ExperimentService.getExperiments()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				console.log('experiments loaded')
			})
			.catch(err => {
				console.log('loading error (experiments)')
				throw err
			})
		},

		async createExperiment({ commit }, experiment) {
			return ExperimentService.postExperiment(experiment)
			.then(() => { 
				commit('CREATE_SUCCESS', experiment)
				console.log('experiment ' + experiment.title + ' created') 
			})
		},

		async deleteExperiment({ commit }, experiment) {
			return ExperimentService.deleteExperiment(experiment)
			.then(() => { 
				commit('DELETE_SUCCESS', experiment)
				console.log('experiment ' + experiment.title + ' deleted') 
			})
		},

		async updateExperiment({ commit }, experiment) {
			return ExperimentService.updateExperiment(experiment)
			.then(() => { 
				commit('UPDATE_SUCCESS', experiment)
				console.log('experiment ' + experiment.title + ' updated') 
			})
		},

		async createTextsheet({ commit }, { experiment, textsheet }) {
			const updatedExperiment = {...experiment}
			const updatedData = {...updatedExperiment.data}
			const updatedTextsheets = [...updatedExperiment.data.textsheets]
			updatedTextsheets.push({...textsheet})
			updatedData.textsheets = updatedTextsheets
			updatedExperiment.data = updatedData
			return ExperimentService.updateExperiment(updatedExperiment)
			.then(() => { 
				commit('UPDATE_SUCCESS', updatedExperiment)
				console.log('textsheet ' + textsheet.title + ' created for ' + updatedExperiment.title + ' updated') 
			})
		},

		async updateTextsheet({ commit }, { experiment, textsheet }) {
			const updatedExperiment = {...experiment}
			const index = updatedExperiment.data.textsheets.findIndex(sheet => sheet.title === textsheet.title)
			updatedExperiment.data.textsheets.splice(index, 1)
			updatedExperiment.data.textsheets.push({...textsheet})
			return ExperimentService.updateExperiment(experiment)
			.then(() => { 
				commit('UPDATE_SUCCESS', updatedExperiment)
				console.log('textsheet ' + textsheet.title + ' updated for ' + updatedExperiment.title + ' updated') 
			})
		}
	}
}