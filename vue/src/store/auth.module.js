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
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess')
          return Promise.resolve(user)
        },
        error => {
          alert('login failed')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('LOGOUT')
    }
  }
}