import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
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
    path: '/procedures/pdfview/:procedureNick',
    name: 'pdfview',
    props: true,
    component: () => import ('../views/PDFView.vue')
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

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
