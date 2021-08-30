import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/channels',
    component: () => import('../views/Channels.vue')
  },
  {
    path: '/channel',
    component: () => import('../views/Channel.vue'),
    props : route => ({ 'name': route.query.name }),    
  },
  {
    path: '/challenge',
    component: () => import('../views/Challenge.vue'),
    props : route => ({ 'challenging': route.query.challenging,'challenger': route.query.challenger,'spectating':route.query.spectating  }),    
  },
  
]

const router = new VueRouter({
  routes
})
import store from "../store"
router.beforeEach((to, from, next) => {  
  if (store.getters) {        
    if (to.path == '/login' && store.getters.authenticated) next({ path: '/channels' })        
    if (to.path == '/channels' && !store.getters.authenticated) next({ path: '/login' })    
    if (to.path == '/channel' && !store.getters.authenticated) next({ path: '/login' })    
    if (to.path == '/challenge' && !store.getters.authenticated) next({ path: '/login' })        
  }
  next()
})

export default router
