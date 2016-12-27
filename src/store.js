import Vue from 'vue'
import Vuex from 'vuex'
import p from 'bz-lib/module'
import _ from 'lodash'
function initCatGod (state, cat) {
  if (state.cat_gods[cat] === undefined) {
    Vue.set(state.cat_gods, cat, [])
  }
}
// Vue.use(Vuex)

// state
export const state = {
  cats: [], // god 的类别
  apply_dels: [],
  cat_gods: {} // 按 cat 分类的gods
}
// mutations
export const mutations = {
  SET_CAT_GODS (state, {cat, gods}) {
    initCatGod(state, cat)
    let merge_gods = state.cat_gods[cat].concat(gods)
    let uniq_gods = _.uniqBy(merge_gods, function (d) {
      return d.id
    }
    )
    state.cat_gods[cat] = uniq_gods
  }
}
// actions
export const actions = {
  getCat ({ state, commit, dispatch }, just_my = null) {
    let parm = {
      just_my: just_my
    }
    return dispatch('get', {url: '/api_cat', body: parm}).then(function (data) {
      if (just_my) {
        state.my_cats = data.cats
      } else {
        state.cats = data.cats
      }
      return data
    })
  },
  getPublicGods ({ state, commit, dispatch }, cat) {
    let parm = {
      cat: cat,
      limit: 10
    }
    let gods = state.cat_gods[cat]
    if (gods) {
      parm.before = gods[gods.length - 1].created_date
    }
    return dispatch('get', {url: '/api_public_gods', body: parm}).then(function (data) {
      commit('SET_CAT_GODS', {cat: cat, gods: data.gods})
    })
  },
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
  mutations,
  actions,
  getters,
  modules: {
    p
  }
})
