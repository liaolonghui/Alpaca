import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/App.vue'
import Documentation from '../views/Documentation.vue'
// App的子页面
import Lend from '../components/Lend.vue'
import Graze from '../components/Graze.vue'
import Farm from '../components/Farm.vue'
import Stake from '../components/Stake.vue'
import Collection from '../components/Collection.vue'
// deposit和withdraw（lend的子功能）
import Deposit from '../components/Lend/Deposit.vue'
import Withdraw from '../components/Lend/Withdraw.vue'

// collection
import VisitCollection from '../components/Collection/VisitCollection.vue'
import EditCollection from '../components/Collection/EditCollection.vue'
import Royalties from '../components/Collection/Royalties.vue'
import ItemsCollection from '../components/Collection/ItemsCollection.vue'
import AddItem from '../components/Collection/AddItem.vue'
import VisitItem from '../components/Collection/VisitItem.vue'
import EditItem from '../components/Collection/EditItem.vue'

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
      { path: '/collection', component: Collection },
      // deposit和withdraw（lend的子功能）
      { path: '/deposit', component: Deposit},
      { path: '/withdraw', component: Withdraw },
      // collection
      { path: '/collection/:name', component: VisitCollection, props: true }, // 查看collection
      { path: '/collection/:name/edit', component: EditCollection, props: true }, // 编辑collection
      { path: '/collection/:name/payouts', component: Royalties, props: true }, // Royalties
      { path: '/collection/:name/assets/edit', component: ItemsCollection, props: true },
      { path: '/collection/:name/assets/create', component: AddItem, props: true }, // 创建item
      { path: '/assets/:id', component: VisitItem, props: true }, // 查看item
      { path: '/collection/:name/assets/:id/edit', component: EditItem, props: true }, // 编辑item
      // 重定向
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
