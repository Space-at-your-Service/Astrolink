// Main store, aka data manager. The store is used as a single source of truth by all the app and is called everytime some data is needed. 
// It is made of several modules, each containing specific data.
// State contains the data.
// Getters are functions that return some computed data to make store data manipulation easier, and can be called outside the store.
// Mutations are simple synchronous functions that affect the State. They should not be called directly outside the store.
// Actions are asynchronous functions that can be called outside the store and generally call mutations.

import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
// import { experiment } from './experiment.module'
// import { inventory } from './inventory.module'
// import { procedure } from './procedure.module'
import { user } from './user.module'
import Textsheet from '../models/textsheet'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		// experiment,
		// inventory,
		// procedure,
		user
	},

	state: {
		missionStartDate: new Date(2021,4,15,0,0,0),
		experiments: [
			{index: 0, title: "Experiment 1", state: "complete", supervisor: "John", img: '../assets/bluenova.jpg', infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", protocol: "../assets/logo.png", textsheets:[new Textsheet('First Datasheet', 'This is a placeholder content. Should be replaced with some data.')]},
			{index: 1, title: "experiment2", state: "aborted", supervisor: "Mary", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", protocol: "../assets/logo.png", datasheets:[]},
			{index: 2, title: "experiment3", state: "planned", supervisor: "Bill", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", protocol: "../assets/logo.png", datasheets:[]}
		],
		procedureTypes: [
			{primaryType: 'General', subtypes: ['Systems', 'Hygiene', 'Cooking', 'Routine maintenance', 'Special maintenance']}, 
			{primaryType: 'Science', subtypes: ['Rover', 'Space suits', 'Georemap/App-EVA', 'Geophysical Exploration', 'Hydration', 'MAS', 'REDMARS', 'Bioplastic', 'Crans Psychology', 'IDUN', 'Psychology-NASA', 'Psychology-Mission', 'Psychology-Design base']},
			{primaryType: 'MCC', subtypes: ['Main']}, 
			{primaryType: 'Emergencies', subtypes: ['Main']}, 
			{primaryType: 'Others', subtypes: ['Main']}
		],
		proceduresList: [
			{nick: 'mas-lunar-base-evacuation', title: 'MAS Lunar Base Evacuation', type: 'Logistics', abstract: 'Aims as achieving this and this by doing this. The expected results are this and that.', path: 'C:/Users/Valentin/Documents/EPFL/Cours M3/Projet Astrolink/Astrolink/vue/public/lib/procedures/2020_SC_SOP_0001_MAS_Lunar_Base_Evacuation.docx.pdf'},
			{nick: 'geophysical-experiment', title: 'Geophysical Experiment', type: 'Logistics', abstract: 'Aims as achieving this and this by doing this. The expected results are this and that.', path: '../../public/lib/procedures/2021_GE_SOP_Geophysical_experiment.docx.pdf'},
			{nick: 'georemap', title: 'GeoReMap', type: 'Logistics', abstract: 'Aims as achieving this and this by doing this. The expected results are this and that.', path: '../../public/lib/procedures/2021_GE_SOP_GeoReMap.docx.pdf'},
			{nick: 'hydration', title: 'Hydration', type: 'Logistics', abstract: 'Aims as achieving this and this by doing this. The expected results are this and that.', path: '../../public/lib/procedures/2021_GE_SOP_Hydration.docx.pdf'},
			{nick: 'lexicon', title: 'Lexicon', type: 'Contacts', abstract: 'Aims as achieving this and this by doing this. The expected results are this and that.', path: '../../public/lib/procedures/2021_GE_SOP_LEXICON_Experiment.docx.pdf'},
			{nick: 'redmars', title: 'RedMars', type: 'Contacts', abstract: 'Aims as achieving this and this by doing this. The expected results are this and that.', path: '../../public/lib/procedures/RedMars_SOP.docx.pdf'}
		]
	},

	getters: {
		missionDayNumber: state => {
			var date = new Date()
			return Math.floor((date.getTime() - state.missionStartDate.getTime())/(1000*3600*24))
		}
	},

	mutations: {
		
	},

	actions: {
		
	}
})

export default store