// Store module that contains the rooms users.

import CommunicationService from '../services/CommunicationService.js'

export const communication = {
	namespaced: true,

	state: {
		rooms: [],
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.rooms = payload
		},

		CREATE_SUCCESS(state, payload) {
			const room = {...payload}
			state.rooms.push(room)
		},

		DELETE_SUCCESS(state, payload) {
			const index = state.rooms.indexOf(payload)
			if (index > -1) {
				state.rooms.splice(index, 1)
			}
		},

		UPDATE_SUCCESS(state, payload) {
			const name = payload.name
			const index = state.rooms.findIndex(room => { return room.name === name })
			if (index > -1) {
				state.rooms.splice(index, 1)

				const room = {...payload}
				state.rooms.push(room)
			}
		}
	},

	actions: {
		async getRooms({ commit }) {
			var payload = undefined
			return CommunicationService.getRooms()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				console.log('communication loaded')
			})
			.catch(err => {
				console.log('loading error (communication)')
				throw err
			})
		},




		async updateRoom({ commit }, room) {
			return CommunicationService.updateRoom(room)
			.then(() => { 
				commit('UPDATE_SUCCESS', room)
				console.log('room ' + room.name + ' updated') 
			})
		}
	}
}