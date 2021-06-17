// Store module that contains the flightplan, i.e the astronauts' schedule

import TaskService from '../services/TaskService.js'
import Serializer from '../utils/Serializer.js'

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
		},

		CREATE_SUCCESS(state, payload) {
			const task = {...payload}
			state.flightplan.push(task)
		}
	},

	actions: {
		async getFlightplanState({ commit }) {
			var payload = undefined
			return TaskService.getFlightplan()
			.then(response => {
				payload = response.data
				const flightplan = []
				for (const serializedTask of payload) {
					flightplan.push(Serializer.deserializeTask(serializedTask))
				}
				commit('SET_STATE', flightplan)
				console.log('flightplan loaded')
			})
			.catch(err => {
				console.log('loading error (flightplan)')
				throw err
			})
		},


		async createTask({ commit }, task) {
			const serializedTask = Serializer.serializeTask(task)
			return TaskService.postTask(serializedTask)
			.then(() => { 
				commit('CREATE_SUCCESS', task)
				console.log('task ' + task.title + ' created for ' + task.split) 
			})

		}
	}
}