// Main store, aka state manager. The store is used as a single source of truth by all the app and is called everytime some data is needed. 
// It is made of several modules, each containing specific data.
// State contains the data.
// Getters are functions that return some computed data to make store data manipulation easier, and can be called outside the store.
// Mutations are simple synchronous functions that affect the State. They should not be commited directly from outside the store.
// Actions are asynchronous functions that can be dispatched from components. They interface with the API calls and can commit mutations.

import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module.js'
import { experiment } from './experiment.module.js'
import { flightplan } from './flightplan.module.js'
import { inventory } from './inventory.module.js'
import { procedure } from './procedure.module.js'
import { user } from './user.module.js'
// import Debug from '../utils/Debug.js'
import ProfileService from '../services/ProfileService.js'

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
		// ['Eleonor', 'Julien', 'Willem', 'Sophie', 'Manuela', 'Sebastian'],
		staff: {
			astronauts: [],
			mcc: [],
			scientists: []
		},
		units: ['Astronauts', 'MCC', 'Scientists'],
		overlay: { show: false, msg: '', img: '', hideSpinner: false },
		alert: { show: false, msg: '', variant: 'warning' }
	},

	getters: {
		missionDayNumber: state => {
			var date = new Date()
			return Math.floor((date.getTime() - state.missionStartDate.getTime())/(1000*3600*24))
		},
		astronautsCrew: state => {
			return state.staff.astronauts
		},
		listUsernames: state => unit => {
			const unitStaff = state.staff[unit]
			if (unitStaff.length === 0) return []
			return unitStaff.map(member => { return member.username })
		}
	},

	mutations: {
		SET_STAFF(state, staff) {
			state.staff = staff
		},
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
		},
		DISPLAY_ALERT(state, payload) {
			state.alert.show = true
			state.alert.msg = payload.msg
			if (payload.variant) state.alert.variant = payload.variant
		},
		HIDE_ALERT(state) {
			state.alert.show = false
			state.alert.msg = ''
			state.alert.variant = 'warning'
		}
	},

	actions: {
		async loadAll({ dispatch }) {
			var errors = []
			var errorFlag = false
			return dispatch('displayOverlay', {msg: 'Loading USER', img: ''})
			// https://cdn.onlinewebfonts.com/svg/img_210318.png
			.then(async () => await dispatch('user/getUserState', null,  {root: true}) )
			.catch((err) => { errorFlag = true; errors.push('User'); console.error(err) })
			.then(() => { dispatch('displayOverlay', {msg: 'Loading INVENTORY', img: ''}) })
			// https://cdn.onlinewebfonts.com/svg/img_449535.png
			.then(async () => await dispatch('inventory/getInventoryState', null,  {root: true}))
			.catch((err) => { errorFlag = true; errors.push('Inventory'); console.error(err) })
			.then(() => { dispatch('displayOverlay', {msg: 'Loading PROCEDURES', img: ''}) })
			// https://cdn.onlinewebfonts.com/svg/img_274798.png
			.then(async () => await dispatch('procedure/getProcedureState', null,  {root: true}))
			.catch((err) => { errorFlag = true; errors.push('Procedures'); console.error(err) })
			.then(() => { dispatch('displayOverlay', {msg: 'Loading FLIGHTPLAN', img: ''}) })
			// https://cdn.onlinewebfonts.com/svg/img_563113.png
			.then(async () => await dispatch('flightplan/getFlightplanState', null,  {root: true}))
			.catch((err) => { errorFlag = true; errors.push('Flightplan'); console.error(err) })
			.then(() => { dispatch('displayOverlay', {msg: 'Loading EXPERIMENTS', img: ''}) })
			// https://cdn.onlinewebfonts.com/svg/img_490832.png
			.then(async () => await dispatch('experiment/getExperimentState', null,  {root: true}))
			.catch((err) => { errorFlag = true; errors.push('Experiments'); console.error(err) })
			.then(() => { dispatch('displayOverlay', {msg: 'Loading MISSION MEMBERS', img: ''}) })
			// https://cdn.onlinewebfonts.com/svg/img_458814.png
			.then(async () => await dispatch('loadMembers', null,  {root: true}))
			.catch((err) => { errorFlag = true; errors.push('Mission members'); console.error(err) })
			.then(() => { dispatch('hideOverlay') })
			// .catch(() => { dispatch('displayOverlay', {msg: 'SERVER ERROR', img: '', hideSpinner: true}) })
			.then(() => { 
				dispatch('hideOverlay')
				if (errorFlag) {
					const errorMessage = 'Failed to load the following resources: ' + errors.join(', ')
					dispatch('displayAlert', { msg: errorMessage, variant: 'danger' }) 
				}
			})
			// https://cdn.onlinewebfonts.com/svg/img_505377.png
		},
		async loadMembers( { commit, state }) {
			var i = 0
			const staff = {...state.staff}
			for (var key in staff) {
				var unit = state.units[i]
				i += 1
				await ProfileService.getUnit(unit)
				.then(response => {
					staff[key] = response.data
				})
			}
			commit('SET_STAFF', staff)
			console.log('mission members loaded') 
		},

		displayOverlay({ commit }, { msg, img, hideSpinner }) {
			commit('MSG_OVERLAY', msg)
			commit('IMG_OVERLAY', img)
			commit('SHOW_OVERLAY', hideSpinner)
		},
		hideOverlay({ commit }) {
			commit('HIDE_OVERLAY')
		},
		displayAlert({ commit }, { msg, variant }) {
			commit('DISPLAY_ALERT', { msg, variant })
		},
		hideAlert({ commit }) {
			commit('HIDE_ALERT')
		}
	}
})

export default store