// Store module that contains procedures

import ProcedureService from '../services/ProcedureService.js'

export const procedure = {
	namespaced: true,

	state: {
		proceduresList: [],
		procedureTypes: []
	},

	getters: {
		procedurePrimaryTypes: state => {
			var procedurePrimaryTypes = []
			for (var type of state.procedureTypes) {
				procedurePrimaryTypes.push(type.primaryType)
			}
			return procedurePrimaryTypes
		}
	},

	mutations: {
		SET_STATE(state, payload) {
			state.proceduresList = payload.procedures
			state.procedureTypes = payload.procedureTypes
		},
		DELETE_SUCCESS(state, payload) {
			const index = state.proceduresList.indexOf(payload);
			if (index > -1) {
				state.proceduresList.splice(index, 1);
			}
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
		},
		deleteProcedure({ commit }, procedure) {
			ProcedureService.deleteProcedure(procedure)
			.then(
				() => { commit('DELETE_SUCCESS', procedure) },
				() => { }
			)
		}
	}
}