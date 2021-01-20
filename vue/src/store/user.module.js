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
		favoriteProcedures: [{nick: 'fake-procedure', title: 'Fake Procedure', type: 'Type', subtype: 'Subtype'}],
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
		ADD_FAV_SUCCESS(state, procedure) {
			state.favoriteProcedures.push(procedure)
		},
		REMOVE_FAV_SUCCESS(state, procedure) {
			const index = state.favoriteProcedures.indexOf(procedure)
			if (index > -1) {
				state.favoriteProcedures.splice(index, 1)
			}
		},
		PASSWORD_CHANGED() {
		}
	},

	actions: {
		getUserState({ commit }) {
			var payload = undefined
			return ProfileService.getUserProfile()
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
		},
		toggleToFavorites({ commit, state }, procedure) {
			const index = state.favoriteProcedures.indexOf(procedure)
			var favoriteProcedures = [...state.favoriteProcedures]
			if (index === -1) {
				favoriteProcedures.push(procedure)
				ProfileService.updateFavorites(favoriteProcedures)
				.then(() => {
					commit('ADD_FAV_SUCCESS', procedure)
					console.log('procedure ' + procedure.title + ' added to user favorites')
				})
			}
			else {
				favoriteProcedures.splice(index, 1)
				ProfileService.updateFavorites(favoriteProcedures)
				.then(() => {
					commit('REMOVE_FAV_SUCCESS', procedure)
					console.log('procedure ' + procedure.title + ' removed from user favorites')
				})
			}
		},
		changePassword({ commit }, {oldPassword, newPassword}) {
			ProfileService.updatePassword(oldPassword, newPassword)
			.then(() => {
				commit('PASSWORD_CHANGED')
				console.log('user password changed')
			})
		}
	}
}