/* eslint-disable no-new */
import './assets/cssreset-min.css'
import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui'
import VueCompositionAPI from '@vue/composition-api'
import VueRouter from 'vue-router'
import Routes from './routers.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCompositionAPI)

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  base: '/',
  saveScrollPosition: true
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept()
}
