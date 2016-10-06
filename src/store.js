import Vue from 'vue'
import Vuex from 'vuex'
import public_module from '../lib_bz/module'
import modeule from './module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    public_module,
    modeule
  }
})
