import Vue from 'vue'

import vuexI18n from 'vuex-i18n';
import { Store } from 'vuex'

/* ChatS  croll */
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
/* i18n */
const i18n_store = new Store()

Vue.use(vuexI18n.plugin,i18n_store)
Vue.config.productionTip = false

import i18n from './i18n'
for (const [k,v] of Object.entries(i18n))
  Vue.i18n.add(k,v)
if (navigator.language in i18n)
  Vue.i18n.set(navigator.language)
else
  Vue.i18n.set('en-US')

import App from './App.vue'
import router from './router'
import store from './store'
import Client from './common/client.service'
import vuetify from './plugins/vuetify'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted(){
    /* Follow OS color scheme */    
      this.$vuetify.theme.dark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches    
  }
}).$mount('#app')
Client.init()