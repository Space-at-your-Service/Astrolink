import ProfileService from '../services/ProfileService.js'

export const perm = {
	namespaced: true,

	state: {
		permissions: []
	},

	mutations: {
		SET_PERMISSIONS(state, permissions) {
			state.permissions = permissions
			console.log(state.permissions)
		}
	},

	actions: {
		getUserPermissions({ commit }) {
			ProfileService.getUserProfile()
			.then(response => {
				commit('SET_PERMISSIONS', response.data.permissions)
			})
		}
	}
}