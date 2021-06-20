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
		},

		DELETE_SUCCESS(state, payload) {
			const index = state.flightplan.findIndex(task => {return task.id === payload.id})
			if (index > -1) {
				state.flightplan.splice(index, 1)
			}
		},

		UPDATE_SUCCESS(state, payload) {
			const index = state.flightplan.findIndex(task => {return task.id === payload.id})
			if (index > -1) {
				state.flightplan.splice(index, 1)

				const task = {...payload}
				state.flightplan.push(task)
			}
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
			var payload = undefined
			const serializedTask = Serializer.serializeTask(task)
			return TaskService.postTask(serializedTask)
			.then(response => { 
				payload = Serializer.deserializeTask(response.data)
				commit('CREATE_SUCCESS', payload)
				console.log('task ' + payload.title + ' created for ' + payload.split) 
			})
		},

		async updateTask({ commit }, task) {
			var payload = undefined
			const serializedTask = Serializer.serializeTask(task)
			return TaskService.updateTask(serializedTask)
			.then(response => { 
				payload = Serializer.deserializeTask(response.data)
				commit('UPDATE_SUCCESS', payload)
				console.log('task ' + payload.id + ' updated ') 
			})
		},

		async deleteTask({ commit }, task) {
			return TaskService.deleteTask(task)
			.then(() => { 
				commit('DELETE_SUCCESS', task)
				console.log('task ' + task.id + ' deleted') 
			})
		}
	}
}