// Store module that contains the flightplan, i.e the astronauts' schedule

import TaskService from '../services/TaskService.js'

export const flightplan = {
	namespaced: true,

	state: {
		flightplan: []
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.flightplan = payload
		}
	},

	actions: {
		async getFlightplanState({ commit }) {
			var payload = undefined
			return TaskService.getFlightplan()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				console.log('flightplan loaded')
			})
			.catch(err => {
				console.log('loading error (flightplan)')
				throw err
			})
		}
	}
}