// import Vue from 'vue'
import Vuex from 'vuex'
import p from 'bz-lib/module'

// Vue.use(Vuex)

// state
export const state = {
  apply_dels: []
}
// mutations
export const mutations = {
}
// actions
export const actions = {
  getApplyDel ({ state, commit, dispatch }, id) {
    return dispatch('get', '/api_apply_del').then(function (data) {
      state.apply_dels = data.apply_dels
    })
  },
  approveApplyDel ({ state, commit, dispatch }, apply_del) {
    return dispatch('put', {url: '/api_apply_del', body: apply_del, loading: true}).then(function (data) {
      dispatch('getApplyDel')
    })
  },
  rejectApplyDel ({ state, commit, dispatch }, id) {
    return dispatch('delete', '/api_apply_del/' + id).then(function (data) {
      dispatch('getApplyDel')
    })
  }
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
