// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './App'
import ApplyDel from './components/ApplyDel'
import Login from './components/Login'
import {checkLogin} from '../../lib_bz/functions/user'
import {initErrorHandle} from '../../lib_bz/functions/error'

const routes = [
  { path: '/', component: ApplyDel },
  { path: '/Login', component: Login }
]
const router = new VueRouter({
  routes // short for routes: routes
})
router.beforeEach((to, from, next) => {
  // check is login?
  if (!checkLogin() && to.path !== '/Login') {
    next('/Login')
    return
  }
  next()
})

App.router = router
new Vue(App).$mount('#app')

//  toastr show error
initErrorHandle()
