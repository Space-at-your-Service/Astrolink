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
		SET_USER(state, user) {
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
			ProfileService.getUserProfile()
			.then(response => {
				commit('SET_USER', response.data)
			})
		}
	}
}