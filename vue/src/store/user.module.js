// Store module that contains user data, including permissions

import ProfileService from '../services/ProfileService.js'
// import TaskService from '../services/TaskService.js'

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
			for (var key in state.permissions) {
				rights.push(key)
			}
			return rights
		},

		isAllowed: (state, getters) => right => {
			return getters.rights.includes(right)
		},

		permissionsReadable: state => {
			return Object.values(state.permissions)
		},

		favoriteProceduresObjects: (state, getters, rootState, rootGetters) => {
			var favoriteProceduresObjects = []
			for (var procedureTitle of state.favoriteProcedures) {
				var procedure = {...rootGetters['procedure/findProcedureByTitle'](procedureTitle)}
				favoriteProceduresObjects.push(procedure)
			}
			return favoriteProceduresObjects
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
		},

		ADD_FAV_SUCCESS(state, procedureTitle) {
			state.favoriteProcedures.push(procedureTitle)
		},

		REMOVE_FAV_SUCCESS(state, procedureTitle) {
			const index = state.favoriteProcedures.indexOf(procedureTitle)
			if (index > -1) {
				state.favoriteProcedures.splice(index, 1)
			}
		},

		PASSWORD_CHANGED() {
		}
	},

	actions: {
		async getUserState({ commit }) {
			var payload = undefined
			return ProfileService.getUserProfile()
			.then(response => {
				payload = response.data
				commit('SET_USER', payload)
				console.log('user loaded')
			})
			.catch(err => {
				console.log(err)
				throw 'loading error (user)'
			})
			// .then(() => { return TaskService.getUserPlanning() })
			// .then(response => {
			// 	payload = response.data
			// 	commit('SET_PLANNING', payload)
			// 	console.log('user planning loaded')
			// })
			// .catch(err => {
			// 	console.log(err)
			// 	throw 'loading error (user planning)'
			// })
		},

		async toggleToFavorites({ commit, state }, procedure) {
			const procedureTitle = procedure.title
			const index = state.favoriteProcedures.indexOf(procedureTitle)
			var favoriteProcedures = [...state.favoriteProcedures]
			if (index === -1) {
				favoriteProcedures.push(procedureTitle)
				return ProfileService.updateFavorites(favoriteProcedures)
				.then(() => {
					commit('ADD_FAV_SUCCESS', procedureTitle)
					console.log('procedure ' + procedureTitle + ' added to user favorites')
				})
			}
			else {
				favoriteProcedures.splice(index, 1)
				return ProfileService.updateFavorites(favoriteProcedures)
				.then(() => {
					commit('REMOVE_FAV_SUCCESS', procedureTitle)
					console.log('procedure ' + procedureTitle + ' removed from user favorites')
				})
			}
		},

		async changePassword({ commit }, {oldPassword, newPassword}) {
			return ProfileService.updatePassword(oldPassword, newPassword)
			.then(() => {
				commit('PASSWORD_CHANGED')
				console.log('user password changed')
			})
		}
	}
}