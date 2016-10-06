import Vue from 'vue'
import Vuex from 'vuex'
import p from '../lib_bz/module'

Vue.use(Vuex)

// state
export const state = {
  rich_list: [],
  rich_text: {},
  user_info: {
    user_name: '',
    picture: ''
  },
  loading: false,
  error_info: '',
  info: ''
}
// mutations
export const mutations = {
}
// actions
export const actions = {
}
// getters
export const getters = {
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  modules: {
    p
  }
})
