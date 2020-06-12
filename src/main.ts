import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// js有个潜规则如果它引入了目录，那么它会直接找index
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'

Vue.config.productionTip = false

Vue.component('Nav', Nav)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
