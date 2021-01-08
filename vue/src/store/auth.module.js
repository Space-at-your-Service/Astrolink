// Store module that contains the "logged in" state

import AuthService from '../services/AuthService'

const token = sessionStorage.getItem('token')
const initialState = token
? { status: { loggedIn: true } }
: { status: { loggedIn: false } }

export const auth = {
  namespaced: true,

  state: initialState,

  mutations: {
    loginSuccess(state) {
      state.status.loggedIn = true
    },
    logout(state) {
      state.status.loggedIn = false
    },
    registerSuccess() {

    },
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
      commit('logout')
    },
    register({ commit }, user) {
      return AuthService.register(user)
      .then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          alert('register failed')
          return Promise.reject(error)
        }
      )
    }
  }
}