import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Client from './common/client.service'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false

Client.init()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
