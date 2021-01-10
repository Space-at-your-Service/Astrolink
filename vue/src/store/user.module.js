// Store module that contains user data, including permissions

import ProfileService from '../services/ProfileService.js'

export const user = {
	namespaced: true,

	state: {
		username: '',
		firstName: '',
		lastName: '',
		groups: [],
		permissions: [],
		favProcedures: [],
		planning: []
	},

	getters: {
		username: state => state.username
	},

	mutations: {
		SET_USER(state, payload) {
			const user = payload.user
			state.username = user.username
			state.firstName = user.first_name
			state.lastName = user.last_name
			state.groups = user.groups
			state.permissions = user.permissions
			// state.favProcedures = user.favProcedures
			// state.planning = user.planning
		}
	},

	actions: {
		getUserState({ commit }) {
			const payload = {user: undefined}
			ProfileService.getUserProfile()
			.then(response => {
				payload.user = response.data
				commit('SET_USER', payload)
				console.log('user loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (user)'
			})
		}
	}
}