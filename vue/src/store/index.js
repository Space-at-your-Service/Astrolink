// Main store, aka data manager. The store is used as a single source of truth by all the app and is called everytime some data is needed. 
// It is made of several modules, each containing specific data.
// State contains the data.
// Getters are functions that return some computed data to make store data manipulation easier, and can be called outside the store.
// Mutations are simple synchronous functions that affect the State. They should not be called directly outside the store.
// Actions are asynchronous functions that can be called outside the store and generally call mutations.

import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module.js'
import { experiment } from './experiment.module.js'
import { flightplan } from './flightplan.module.js'
import { inventory } from './inventory.module.js'
import { procedure } from './procedure.module.js'
import { user } from './user.module.js'
import Debug from '../utils/Debug.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		experiment,
		flightplan,
		inventory,
		procedure,
		user
	},

	state: {
		missionStartDate: new Date(2021,4,15,0,0,0),
		astronautsCrew: ['Julien', 'William', 'Lisbeth', 'Pierre', 'Paul', 'Jacqueline'],
		overlay: {show: false, msg: '', img: '', hideSpinner: false}
	},

	getters: {
		missionDayNumber: state => {
			var date = new Date()
			return Math.floor((date.getTime() - state.missionStartDate.getTime())/(1000*3600*24))
		}
	},

	mutations: {
		SHOW_OVERLAY(state, hideSpinner) {
			state.overlay.show = true
			state.overlay.hideSpinner = hideSpinner
		},
		HIDE_OVERLAY(state) {
			state.overlay.show = false
			state.overlay.msg = ''
			state.overlay.img = ''
		},
		MSG_OVERLAY(state, msg) {
			state.overlay.msg = msg
		},
		IMG_OVERLAY(state, img) {
			state.overlay.img = img
		}
	},

	actions: {
		async loadAll({ dispatch }) {
			return dispatch('displayOverlay', {msg: 'Loading USER', img: 'https://cdn.onlinewebfonts.com/svg/img_210318.png'})
			.then(() => Debug.sleep(200))
			.then(async () => await dispatch('user/getUserState', null,  {root: true}) )
			.then(() => { dispatch('displayOverlay', {msg: 'Loading INVENTORY', img: 'https://cdn.onlinewebfonts.com/svg/img_449535.png'}) })
			.then(() => Debug.sleep(200))
			.then(async () => await dispatch('inventory/getInventoryState', null,  {root: true}))
			.then(() => { dispatch('displayOverlay', {msg: 'Loading PROCEDURES', img: 'https://cdn.onlinewebfonts.com/svg/img_274798.png'}) })
			.then(() => Debug.sleep(200))
			.then(async () => await dispatch('procedure/getProcedureState', null,  {root: true}))
			.then(() => { dispatch('displayOverlay', {msg: 'Loading FLIGHTPLAN', img: 'https://cdn.onlinewebfonts.com/svg/img_563113.png'}) })
			.then(() => Debug.sleep(200))
			.then(async () => await dispatch('flightplan/getFlightplanState', null,  {root: true}))
			// .then(() => { dispatch('displayOverlay', {msg: 'Loading EXPERIMENTS', img: 'https://cdn.onlinewebfonts.com/svg/img_490832.png'}) })
			// .then(() => Debug.sleep(200))
			// .then(async () => await dispatch('experiment/getExperimentState', null,  {root: true}))
			.then(() => { dispatch('hideOverlay') })
			.catch(() => { dispatch('displayOverlay', {msg: 'SERVER ERROR', img: 'https://cdn.onlinewebfonts.com/svg/img_505377.png', hideSpinner: true}) })
		},
		displayOverlay({ commit }, { msg, img, hideSpinner }) {
			commit('MSG_OVERLAY', msg)
			commit('IMG_OVERLAY', img)
			commit('SHOW_OVERLAY', hideSpinner)
		},
		hideOverlay({ commit }) {
			commit('HIDE_OVERLAY')
		}
	}
})

export default store