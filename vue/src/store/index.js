// Main store, aka data manager. The store is used as a single source of truth by all the app and is called everytime some data is needed. 
// It is made of several modules, each containing specific data.
// State contains the data.
// Getters are functions that return some computed data to make store data manipulation easier, and can be called outside the store.
// Mutations are simple synchronous functions that affect the State. They should not be called directly outside the store.
// Actions are asynchronous functions that can be called outside the store and generally call mutations.

import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { experiment } from './experiment.module'
import { inventory } from './inventory.module'
import { procedure } from './procedure.module'
import { user } from './user.module'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		experiment,
		inventory,
		procedure,
		user
	},

	state: {
		missionStartDate: new Date(2021,4,15,0,0,0),
		astronautsCrew: ['Julien', 'William', 'Lisbeth', 'Pierre', 'Paul', 'Jacqueline'],
		overlay: {show: false, message: ''}
	},

	getters: {
		missionDayNumber: state => {
			var date = new Date()
			return Math.floor((date.getTime() - state.missionStartDate.getTime())/(1000*3600*24))
		}
	},

	mutations: {
		SHOW_OVERLAY(state) {
			state.overlay.show = true
		},
		HIDE_OVERLAY(state) {
			state.overlay.show = false
		},
		MSG_OVERLAY(state, message) {
			state.overlay.message = message
		}
	},

	actions: {
		loadAll({ dispatch }) {
			return dispatch('displayOverlay', 'Loading USER')
			.then(() => {
				return new Promise(resolve => {
					setTimeout(() => {resolve()}, 300); // (*)
				})
			})
			.then(() => { dispatch('user/getUserState', null,  {root: true}) })
			.then(() => { dispatch('displayOverlay', 'Loading INVENTORY') })
			.then(() => {
				return new Promise(resolve => {
					setTimeout(() => {resolve()}, 300); // (*)
				})
			})
			.then(() => { dispatch('inventory/getInventoryState', null,  {root: true}) })
			.then(() => { dispatch('displayOverlay', 'Loading PROCEDURES') })
			.then(() => {
				return new Promise(resolve => {
					setTimeout(() => {resolve()}, 300); // (*)
				})
			})
			.then(() => { dispatch('procedure/getProcedureState', null,  {root: true}) })
			.then(() => { dispatch('hideOverlay') })
		},
		displayOverlay({ commit }, message) {
			commit('SHOW_OVERLAY')
			commit('MSG_OVERLAY', message)
		},
		hideOverlay({ commit }) {
			commit('HIDE_OVERLAY')
		}
	}
})

export default store