import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存钱包地址
    publicAddress: '',
    // balance
    balance: 0
  },
  mutations: {
    // 保存地址
    saveAddress(state, address) {
      state.publicAddress = address
    },
    // 保存余额
    saveBalance(state, balance) {
      state.balance = balance
    } 
  },
  actions: {
    // 保存地址
    saveAddress({commit}, address) {
      commit('saveAddress', address)
    },
    // 保存余额
    savaBalance({commit}, balance) {
      commit('saveBalance', balance)
    }
  },
  modules: {
  }
})
