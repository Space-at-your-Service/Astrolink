// Store module that contains the procedures

import ProcedureService from '../services/ProcedureService.js'

export const procedure = {
	namespaced: true,

	state: {
		procedures: [],
		procedureTypes: [
			{primaryType: 'General', subtypes: ['Systems', 'Hygiene', 'Cooking', 'Routine maintenance', 'Special maintenance']}, 
			{primaryType: 'Science', subtypes: ['Rover', 'Space suits', 'Georemap/App-EVA', 'Geophysical Exploration', 'Hydration', 'MAS', 'REDMARS', 'Bioplastic', 'Crans Psychology', 'IDUN', 'Psychology-NASA', 'Psychology-Mission', 'Psychology-Design base']},
			{primaryType: 'MCC', subtypes: ['Main']}, 
			{primaryType: 'Emergencies', subtypes: ['Main']}, 
			{primaryType: 'Others', subtypes: ['Main']}
		],
		uploadProgress: 0
	},

	getters: {
		procedurePrimaryTypes: state => {
			var procedurePrimaryTypes = []
			for (var type of state.procedureTypes) {
				procedurePrimaryTypes.push(type.primaryType)
			}
			return procedurePrimaryTypes
		},
		proceduresByType: state => {
			var procedureSections = []
			for (var type of state.procedureTypes) {
				var colorVariant = 'primary'
				// var typeColorPair = this.typesColorVariants.find(typeColorPair => typeColorPair.type === type.primaryType)
				// if (typeColorPair) {
				// 	colorVariant = typeColorPair.colorVariant
				// }

				var section = {type: type.primaryType, colorVariant: colorVariant, subsections: []}
				var proceduresOfType = state.procedures.filter(procedure => procedure.type === type.primaryType)
				for (var subtype of type.subtypes) {
					var proceduresOfSubtype = proceduresOfType.filter(procedure => procedure.subtype === subtype)
					var subsection = {type: subtype, procedures: proceduresOfSubtype}
					section.subsections.push(subsection)
				}
				procedureSections.push(section)
			}
		return procedureSections
		},
		proceduresAsOptions : (state, getters) =>  {
			var options = []
			const proceduresByType = getters.proceduresByType
			for (var section of proceduresByType) {
				const optionGroup = { label: section.type, options: [] }
				for (var subsection of section.subsections) {
					for (var procedure of subsection.procedures) {
						optionGroup.options.push({value: procedure, text: '[' + subsection.type + '] ' + procedure.title})
					}
				}
				options.push(optionGroup)
			}
			return options
		}
	},

	mutations: {
		SET_STATE(state, payload) {
			state.procedures = payload.procedures
			// state.procedureTypes = payload.procedureTypes
		},
		CREATE_SUCCESS(state, payload) {
			const procedure = {...payload}
			state.procedures.push(procedure)
		},
		DELETE_SUCCESS(state, payload) {
			const index = state.procedures.indexOf(payload)
			if (index > -1) {
				state.procedures.splice(index, 1)
			}
		},
		UPDATE_SUCCESS(state, payload) {
			const nick = payload.nick
			const index = state.procedures.findIndex(procedure => { return procedure.nick === nick })
			console.log(state.procedures[index])
			if (index > -1) {
				state.procedures.splice(index, 1)

				const procedure = {...payload}
				state.procedures.push(procedure)
			}
		}
	},

	actions: {
		getProcedureState({ commit }) {
			var payload = {procedures: [], procedureTypes: []}
			return ProcedureService.getProcedures()
			.then(response => {
				payload.procedures = response.data
				// ProcedureService.getProcedureTypes()
				// .then(response => {
					// payload.procedureTypes = response.data
					commit('SET_STATE', payload)
					console.log('procedures loaded')
				// })
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (procedures)'
			})
		},
		createProcedure({ commit, state }, procedure) {
			const formData = new FormData()
			formData.append('nick', procedure.nick)
			formData.append('title', procedure.title)
			formData.append('type', procedure.type)
			formData.append('subtype', procedure.subtype)
			formData.append('abstract', procedure.abstract)
			formData.append('pdfFile', procedure.file)

			ProcedureService.postProcedure(formData, event => { state.uploadProgress = Math.round((100*event.loaded) / event.total) })
			.then(() => { 
				commit('CREATE_SUCCESS', procedure)
				state.uploadProgress = 0
				console.log('procedure ' + procedure.title + ' created') 
			})
		},
		deleteProcedure({ commit }, procedure) {
			ProcedureService.deleteProcedure(procedure)
			.then(() => { 
				commit('DELETE_SUCCESS', procedure)
				console.log('procedure ' + procedure.title + ' deleted') 
			})
		},
		updateProcedure({ commit, state }, procedure) {
			const formData = new FormData()
			formData.append('nick', procedure.nick)
			formData.append('title', procedure.title)
			formData.append('type', procedure.type)
			formData.append('subtype', procedure.subtype)
			formData.append('abstract', procedure.abstract)
			formData.append('pdfFile', procedure.file)

			ProcedureService.updateProcedure(formData, event => { state.uploadProgress = Math.round((100*event.loaded) / event.total) })
			.then(() => { 
				commit('UPDATE_SUCCESS', procedure)
				state.uploadProgress = 0
				console.log('procedure ' + procedure.title + ' updated') 
			})
		}
	}
}