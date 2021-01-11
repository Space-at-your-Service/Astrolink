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
		getFlightplanState({ commit }) {
			var payload = undefined
			TaskService.getFlightplan()
			.then(response => {
				payload = response
				commit('SET_STATE', payload)
				console.log('flightplan loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (flightplan)'
			})
		}
	}
}