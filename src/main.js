import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/global.css'

// bs
import 'bootstrap'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

$(function () { $("[data-toggle='tooltip']").tooltip(); })

// iconfont
import './assets/font/iconfont.css'

import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
