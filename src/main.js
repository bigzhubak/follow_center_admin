// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './App'
import ApplyDel from './components/ApplyDel'
import Login from './components/Login'
import {checkLogin} from '../lib_bz/functions/user'
import {initErrorHandle} from '../lib_bz/functions/error'

const routes = [
  { path: '/', component: ApplyDel },
  { path: '/Login', component: Login }
]
const router = new VueRouter({
  routes // short for routes: routes
})
App.router = router
var app = new Vue(App).$mount('#app')

// check is login?
if (!checkLogin()) {
  app.$router.push('/Login')
}
//  toastr show error
initErrorHandle()
