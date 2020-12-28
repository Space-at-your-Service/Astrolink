import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { perm } from './perm.module'
import Datasheet from '../models/datasheet'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		perm
	},

	state: {
		missionStartDate: new Date(2021,4,15,0,0,0),
		experiments: [
			{expanded: false, index: 0, title: "Experiment 1", state: "complete", supervisor: "John", img: '../assets/bluenova.jpg', infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", protocol: "../assets/logo.png", datasheets:[new Datasheet('First Datasheet', 'This is a placeholder content. Should be replaced with some data.')]},
			{expanded: false, index: 1, title: "experiment2", state: "aborted", supervisor: "Mary", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", protocol: "../assets/logo.png", datasheets:[]},
			{expanded: false, index: 2, title: "experiment3", state: "planned", supervisor: "Bill", infoShort:"This describes the experiment in one sentence.",info: "This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.This is a more detailed description.", protocol: "../assets/logo.png", datasheets:[]}
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
		loggedIn: state => {
			return state.auth.status.loggedIn
		},
		missionDayNumber: state => {
			var date = new Date()
			return Math.floor((date.getTime() - state.missionStartDate.getTime())/(1000*3600*24))
		}
	},

	mutations: {
		// ADD_ITEM_UNIT(state, item) {
		// 	item.quantity++;
		// },
		// REMOVE_ITEM_UNIT(state, item) {
		// 	item.quantity--;
		// },
		// DELETE_ITEM(state, index) {
		// 	state.inventory.splice(index, 1);
		// },
		// CREATE_NEW_ITEM(state, payload) {
		// 	state.inventory.push({id: payload.id, name: payload.name, type: payload.type, quantity: payload.quantity})
		// },
		// INVENTORY_REGISTER_ENTRY(state, msg) {
		// 	var date = new Date();
		// 	state.inventoryHistory.push(date+": "+msg)
		// }
	},

	actions: {
		// addItemUnit(context, id) {
		// 	var item = context.state.inventory.find(element => element.id === id);
		// 	if (typeof item !== 'undefined') {
		// 		context.commit("ADD_ITEM_UNIT", item);
		// 		context.commit("INVENTORY_REGISTER_ENTRY", context.state.currentAccount.name+" added 1 unit of "+item.name)
		// 	}
		// 	else {
		// 		console.log("no item with id "+id)
		// 	}
		// },
		// removeItemUnit(context, id) {
		// 	var item = context.state.inventory.find(element => element.id === id);
		// 	if (typeof item !== 'undefined') {
		// 		if (item.quantity>0) {
		// 			context.commit("REMOVE_ITEM_UNIT", item);
		// 			context.commit("INVENTORY_REGISTER_ENTRY", context.state.currentAccount.name+" removed 1 unit of "+item.name)
		// 		}
		// 	}
		// 	else {
		// 		console.log("no item with id "+id)
		// 	}
		// },
		// deleteItem(context, id) {
		// 	var item = context.state.inventory.findIndex(element => element.id === id);
		// 	var index = context.state.inventory.indexOf(item);
		// 	context.commit("DELETE_ITEM", index);
		// 	context.commit("INVENTORY_REGISTER_ENTRY", context.state.currentAccount.name+" deleted the item "+item.name)
		// },
		// createNewItem(context, payload) {
		// 	context.commit("CREATE_NEW_ITEM", {id: payload.id, name: payload.name, type: payload.type, quantity: payload.quantity})
		// 	context.commit("INVENTORY_REGISTER_ENTRY", context.state.currentAccount.name+" created the item "+payload.name)
		// }
	}
})

export default store