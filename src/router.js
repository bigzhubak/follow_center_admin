import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ApplyDel from './components/ApplyDel'
import Login from './components/Login'

const routes = [
  { path: '/', redirect: '/ApplyDel' },
  { path: '/ApplyDel', component: ApplyDel },
  { path: '/Login', component: Login }
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
