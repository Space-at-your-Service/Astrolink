// Store module that contains the authentication state

import AuthService from '../services/AuthService'

const token = sessionStorage.getItem('token')
const initialState = token
? { status: { loggedIn: true } }
: { status: { loggedIn: false } }

export const auth = {
  namespaced: true,

  state: initialState,

  mutations: {
    LOGIN_SUCCESS(state) {
      state.status.loggedIn = true
    },
    LOGOUT(state) {
      state.status.loggedIn = false
    }
  },

  actions: {
    async login({ commit }, user) {
      return AuthService.login(user)
      .then(response => {
        const token = response.data.token
        if (token) {
          sessionStorage.setItem('token', token)
          commit('LOGIN_SUCCESS')
        }
      })
    },
    logout({ commit }) {
      sessionStorage.removeItem('token')
      commit('LOGOUT')
    }
  }
}