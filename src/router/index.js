import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/App.vue'
import Documentation from '../views/Documentation.vue'
import Lend from '../components/Lend.vue'
import Graze from '../components/Graze.vue'
import Farm from '../components/Farm.vue'
import Stake from '../components/Stake.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/app',
    name: 'App',
    component: App,
    children: [
      { path: '/lend', component: Lend },
      { path: '/grazing-range', component: Graze },
      { path: '/farm', component: Farm },
      { path: '/stake', component: Stake },
      { path: '/', redirect: '/lend' }
    ]
  },
  {
    path: '/docs',
    name: 'Documentation',
    component: Documentation
  }
]

const router = new VueRouter({
  routes
})

export default router
