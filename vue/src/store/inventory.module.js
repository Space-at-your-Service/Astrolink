// Store module that contains the inventory of base items

import InventoryService from '../services/InventoryService.js'

export const inventory = {
	namespaced: true,

	state: {
		inventory: [],
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.inventory = payload
		},
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
		getInventoryState({ commit }) {
			var payload = undefined
			InventoryService.getItems()
			.then(response => {
				payload = response
				commit('SET_STATE', payload)
				console.log('inventory loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (inventory)'
			})
		},
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
}