// The router that manages the content to display. It allows smooth navigation in the app without having to refresh all the content when changing page.
// Each route is associated to a View or a Component to display.
// Also includes Navigation guards to restrict accessible routes depending on the "logged in" state.

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const ifNotLogged = (to, from, next) => {
  const loggedIn = store.state.auth.status.loggedIn
  if (!loggedIn) {
    next()
    return
  }
  next('/profile')
}

const routes = [
  {
    path: '/404',
    name: '404notfound',
    component: () => import('../views/404NotFound.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/login',
    alias: '/',
    name: 'login',
    beforeEnter: ifNotLogged,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/flightplan',
    name: 'flightplan',
    component: () => import('../views/Flightplan.vue')
  },
  {
    path: '/procedures',
    name: 'procedures',
    component: () => import('../views/Procedures.vue')
  },
  {
    path: '/experiments',
    name: 'experiments',
    component: () => import('../views/Experiments.vue')
  },
  {
    path: '/experiments/:experimentTitle',
    name: 'experiment_details',
    props: true,
    component: () => import('../views/ExperimentDetails.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('../views/Inventory.vue')
  },
  {
    path: '/psyforms',
    name: 'psyforms',
    component: () => import('../views/Psyforms.vue')
  },
  {
    path: '/communication',
    name: 'communication',
    component: () => import('../views/Communication.vue')
  },
  {
    path: '/experiments/:experimentTitle/data/textsheets/:sheetTitle',
    name: 'experiment_textdata',
    props: true,
    component: () => import ('../views/ExperimentTextData.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('../views/Planning.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const publicPages = ['/login', '/signup']

router.beforeEach((to, from, next) => {
  
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.state.auth.status.loggedIn

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
