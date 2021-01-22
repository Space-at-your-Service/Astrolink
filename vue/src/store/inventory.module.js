// Store module that contains the inventory of Base items

import InventoryService from '../services/InventoryService.js'

export const inventory = {
	namespaced: true,

	state: {
		items: [],
	},

	getters: {
	},

	mutations: {
		SET_STATE(state, payload) {
			state.items = payload
		},
		// ADD_ITEM_UNIT(state, item) {
		// 	item.quantity++;
		// },
		// REMOVE_ITEM_UNIT(state, item) {
		// 	item.quantity--;
		// },
		CREATE_SUCCESS(state, payload) {
			const item = {...payload}
			state.items.push(item)
		},
		DELETE_SUCCESS(state, payload) {
			const index = state.items.indexOf(payload)
			if (index > -1) {
				state.items.splice(index, 1)
			}
		},
		UPDATE_SUCCESS(state, payload) {
			const id = payload.id
			const index = state.items.findIndex(item => { return item.id === id })
			if (index > -1) {
				state.items.splice(index, 1)

				const item = {...payload}
				state.items.push(item)
			}
		}
	},

	actions: {
		getInventoryState({ commit }) {
			var payload = undefined
			return InventoryService.getItems()
			.then(response => {
				payload = response.data
				commit('SET_STATE', payload)
				console.log('inventory loaded')
			})
			.catch(error => {
				console.log(error)
				throw 'loading error (inventory)'
			})
		},
		createItem({ commit }, item) {
			return InventoryService.postItem(item)
			.then(() => { 
				commit('CREATE_SUCCESS', item)
				console.log('item ' + item.name + ' created') 
			})
		},
		deleteItem({ commit }, item) {
			return InventoryService.deleteItem(item)
			.then(() => { 
				commit('DELETE_SUCCESS', item)
				console.log('item ' + item.name + ' deleted') 
			})
		},
		updateItem({ commit }, item) {
			return InventoryService.updateItem(item)
			.then(() => { 
				commit('UPDATE_SUCCESS', item)
				console.log('item ' + item.name + ' updated') 
			})
		}
	}
}