// Store module that contains user data, including permissions

import ProfileService from '../services/ProfileService.js'
import TaskService from '../services/TaskService.js'

export const user = {
	namespaced: true,

	state: {
		username: '',
		firstName: '',
		lastName: '',
		groups: [],
		permissions: [],
		favoriteProcedures: [],
		planning: []
	},

	getters: {
		rights: state => {
			var rights = []
			for (var permission of state.permissions) {
				for (var key in permission)
					rights.push(key)
			}
			return rights
		},
		isAllowed: (state, getters) => right => {
			return getters.rights.includes(right)
		},
		permissionsReadable: state => {
			var permissionsReadable = []
			for (var permission of state.permissions) {
				for (var key in permission)
					permissionsReadable.push(permission[key])
			}
			return permissionsReadable
		}
	},

	mutations: {
		SET_USER(state, payload) {
			const user = payload
			state.username = user.username
			state.firstName = user.first_name
			state.lastName = user.last_name
			state.groups = user.groups
			state.permissions = user.permissions
			state.favoriteProcedures = user.favoriteProcedures
			
		},
		SET_PLANNING(state, payload) {
			state.planning = payload
		}
	},

	actions: {
		getUserState({ commit }) {
			var payload = undefined
			ProfileService.getUserProfile()
			.then(response => {
				payload = response.data
				commit('SET_USER', payload)
				console.log('user loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (user)'
			})
			.then(() => { return TaskService.getUserPlanning() })
			.then(response => {
				payload = response.data
				commit('SET_PLANNING', payload)
				console.log('user planning loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (user planning)'
			})
		}
	}
}