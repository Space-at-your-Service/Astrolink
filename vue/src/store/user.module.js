import ProfileService from '../services/ProfileService.js'

export const user = {
	namespaced: true,

	state: {
		username: '',
		permissions: []
	},

	mutations: {
		SET_PERMISSIONS(state, user) {
			state.username = user.username
			state.permissions = user.permissions
		}
	},

	actions: {
		getUserPermissions({ commit }) {
			ProfileService.getUserProfile()
			.then(response => {
				commit('SET_PERMISSIONS', response.data)
			})
		}
	}
}