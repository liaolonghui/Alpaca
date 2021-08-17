import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/App.vue'
import Documentation from '../views/Documentation.vue'
// App的子页面
const Lend = () => import(/* webpackChunkName: "lend" */ '../components/Lend.vue')
// deposit和withdraw（lend的子功能）
const Deposit = () =>  import(/* webpackChunkName: "lend" */ '../components/Lend/Deposit.vue')
const Withdraw = () => import(/* webpackChunkName: "lend" */ '../components/Lend/Withdraw.vue')

const Graze = () => import(/* webpackChunkName: "graze" */ '../components/Graze.vue')
const Farm = () => import(/* webpackChunkName: "farm" */ '../components/Farm.vue')
const Trade = () => import(/* webpackChunkName: "trade" */ '../components/Trade.vue')

const Collection = () => import(/* webpackChunkName: "collection" */ '../components/Collection.vue')
// collection
const VisitCollection = () => import(/* webpackChunkName: "collection" */ '../components/Collection/VisitCollection.vue')
const EditCollection = () => import(/* webpackChunkName: "collection" */ '../components/Collection/EditCollection.vue')
const Royalties = () => import(/* webpackChunkName: "collection" */ '../components/Collection/Royalties.vue')
const ItemsCollection = () => import(/* webpackChunkName: "items" */ '../components/Collection/ItemsCollection.vue')
const AddItem = () => import(/* webpackChunkName: "items" */ '../components/Collection/AddItem.vue')
const VisitItem = () => import(/* webpackChunkName: "items" */ '../components/Collection/VisitItem.vue')
const EditItem = () => import(/* webpackChunkName: "items" */ '../components/Collection/EditItem.vue')
const SellItem = () => import(/* webpackChunkName: "sell-items" */ '../components/Collection/SellItem.vue')
const SellBundle = () => import(/* webpackChunkName: "sell-items" */ '../components/Collection/SellBundle.vue') // SellBundle 
const Account = () => import(/* webpackChunkName: "account" */ '../components/Collection/Account.vue') // Account


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
      { path: '/trade', component: Trade },
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
      { path: '/assets/:id/sell', component: SellItem, props: true }, // sell
      { path: '/account', component: Account }, // account
      { path: '/bundle/sell', component: SellBundle }, // sellBundle
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
