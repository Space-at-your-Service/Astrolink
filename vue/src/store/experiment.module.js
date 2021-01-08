// Store module that contains experiments, including datasheets

import ExperimentService from '../services/ExperimentService.js'
import Textsheet from '../models/textsheet'

export const experiment = {
	namespaced: true,

	state: {
		experiments: [
			{index: 0, title: "Experiment 1", state: "complete", supervisor: "John", img: '../assets/bluenova.jpg', infoShort:"This describes the experiment in one sentence.",info: "This is a detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", procedures: [], textsheets:[new Textsheet('First Datasheet', 'This is a placeholder content. Should be replaced with some data.')]},
			{index: 1, title: "experiment2", state: "aborted", supervisor: "Mary", infoShort:"This describes the experiment in one sentence.",info: "The detailed description.", procedures: [], datasheets:[]},
			{index: 2, title: "experiment3", state: "planned", supervisor: "Bill", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", procedures: [], datasheets:[]},
			{index: 3, title: "Experiment 1", state: "complete", supervisor: "John", img: '../assets/bluenova.jpg', infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", procedures: [], textsheets:[new Textsheet('First Datasheet', 'This is a placeholder content. Should be replaced with some data.')]},
			{index: 4, title: "experiment2", state: "aborted", supervisor: "Mary", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", procedures: [], datasheets:[]},
			{index: 5, title: "experiment3", state: "planned", supervisor: "Bill", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This iscription.This is a more detailed description.This is a more detailed description.This is a more detailed description.", procedures: [], datasheets:[]}
		],
	},

	getters: {
		getExperimentByTitle: (state) => (title) => {
			return state.experiments.find(experiment => experiment.title === title)
		}
	},

	mutations: {
		SET_STATE(state, payload) {
			state.experiments = payload
		}
	},

	actions: {
		getExperimentState({ commit }) {
			var payload = undefined
			ExperimentService.getExperiments()
			.then(response => {
				payload = response
				commit('SET_STATE', payload)
			})
		}
	}
}