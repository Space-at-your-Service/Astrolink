// Store module that contains experiments, including datasheets

import ExperimentService from '../services/ExperimentService.js'

export const experiment = {
	namespaced: true,

	state: {
		experiments: [],
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.experiments = payload
		}
	},

	actions: {
		getExperimentState({ commit }) {
			var payload = undefined
			ExperimentService.getExperiments()
			.then(response => {
				payload = response
				commit('SET_STATE', payload)
			})
		}
	}
}