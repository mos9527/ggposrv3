import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '主页',
    component: Home
  },
  {
    path: '/login',
    name: '登陆',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/channels',
    name: '频道列表',
    component: () => import('../views/Channels.vue')
  },
  {
    path: '/channel',
    name: '频道',
    component: () => import('../views/Channel.vue'),
    props : route => ({ 'name': route.query.name }),    
  },
  {
    path: '/challenge',
    name: '挑战',
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
    if (to.name == '登陆' && store.getters.authenticated) next({ path: '/channels' })        
    if (to.name == '频道列表' && !store.getters.authenticated) next({ path: '/login' })    
    if (to.name == '频道' && !store.getters.authenticated) next({ path: '/login' })    
    if (to.name == '挑战' && !store.getters.authenticated) next({ path: '/login' })    
    next()
  }
})
router.afterEach((to) => {  
  Vue.nextTick(() => {
      document.title = to.name
  });
});

export default router
