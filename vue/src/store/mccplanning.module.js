// Store module that contains the MCC planning

import TaskService from '../services/TaskService.js'
import Serializer from '../utils/Serializer.js'

export const mccplanning = {
	namespaced: true,

	state: {
		mccPlanning: []
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.mccPlanning = payload
		},

		CREATE_SUCCESS(state, payload) {
			const task = {...payload}
			state.mccPlanning.push(task)
		},

		DELETE_SUCCESS(state, payload) {
			const index = state.mccPlanning.findIndex(task => {return task.id === payload.id})
			if (index > -1) {
				state.mccPlanning.splice(index, 1)
			}
		},

		UPDATE_SUCCESS(state, payload) {
			const index = state.mccPlanning.findIndex(task => {return task.id === payload.id})
			if (index > -1) {
				state.mccPlanning.splice(index, 1)

				const task = {...payload}
				state.mccPlanning.push(task)
			}
		}
	},

	actions: {
		async getMccPlanningState({ commit }) {
			var payload = undefined
			return TaskService.getMccPlanning()
			.then(response => {
				payload = response.data
				const mccPlanning = []
				for (const serializedTask of payload) {
					mccPlanning.push(Serializer.deserializeTask(serializedTask))
				}
				commit('SET_STATE', mccPlanning)
				console.log('MCC planning loaded')
			})
			.catch(err => {
				console.log('loading error (MCC planning)')
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