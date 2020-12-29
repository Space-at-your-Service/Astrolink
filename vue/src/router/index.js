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
    path: '*',
    name: '404notfound',
    component: () => import('../views/404NotFound.vue')
  },
  // {
  //   path: '*',
  //   redirect: '/404'
  // },
  {
    path: '/login',
    alias: '/',
    name: 'login',
    beforeEnter: ifNotLogged,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: ifNotLogged,
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
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
    path: '/experiments/:experimentTitle/newdata',
    name: 'experiment_data',
    props: true,
    component: () => import ('../views/ExperimentData.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    props:true,
    component: () => import('../views/Profile.vue')
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
