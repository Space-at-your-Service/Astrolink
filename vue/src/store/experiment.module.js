// Store module that contains experiments, including datasheets

import ExperimentService from '../services/ExperimentService.js'
import Experiment from '../models/Experiment.js'

export const experiment = {
	namespaced: true,

	state: {
		experiments: [
			new Experiment('Experiment 1', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
			new Experiment('Experiment 2', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
			new Experiment('Experiment 3', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
			new Experiment('Experiment 4', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
			new Experiment('Experiment 5', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
			new Experiment('Experiment 6', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
			new Experiment('Experiment 7', 'This is a short abstract less than 140 words.', 'This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. This description can be as long as you want, up to 1000 characters. '),
		],
		statusOptions: ['planned', 'ongoing', 'complete', 'aborted']
	},

	getters: {
		getExperimentByTitle: (state) => (title) => {
			return state.experiments.find(experiment => experiment.title === title)
		}
	},

	mutations: {
		SET_STATE(state, payload) {
			state.experiments = payload
		}
	},

	actions: {
		getExperimentState({ commit }) {
			var payload = undefined
			return ExperimentService.getExperiments()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				console.log('experiments loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (experiments)'
			})
		},
		createExperiment({ commit }, experiment) {
			ExperimentService.postExperiment(experiment)
			.then(() => { 
				commit('CREATE_SUCCESS', experiment)
				console.log('experiment ' + experiment.title + ' created') 
			})
		},
		deleteExperiment({ commit }, experiment) {
			ExperimentService.deleteExperiment(experiment)
			.then(() => { 
				commit('DELETE_SUCCESS', experiment)
				console.log('experiment ' + experiment.title + ' deleted') 
			})
		},
		updateExperiment({ commit }, experiment) {
			ExperimentService.updateExperiment(experiment)
			.then(() => { 
				commit('UPDATE_SUCCESS', experiment)
				console.log('experiment ' + experiment.title + ' updated') 
			})
		}
	}
}