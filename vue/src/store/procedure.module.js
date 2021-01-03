// Store module that contains procedures

import ProcedureService from '../services/ProcedureService.js'

export const procedure = {
	namespaced: true,

	state: {
		proceduresList: [],
		procedureTypes: []
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.proceduresList = payload.procedures
			state.procedureTypes = payload.procedureTypes
		}
	},

	actions: {
		getProcedureState({ commit }) {
			var payload = {procedures: [], procedureTypes: []}

			ProcedureService.getProcedures()
			.then(response => {
				payload.procedures = response.data
				ProcedureService.getProcedureTypes()
				.then(response => {
					payload.procedureTypes = response.data
					commit('SET_STATE', payload)
				})
			})
		}
	}
}