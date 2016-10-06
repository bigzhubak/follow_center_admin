// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './App'
import ApplyDel from './components/ApplyDel'

const routes = [
  { path: '/', component: ApplyDel }
]
const router = new VueRouter({
  routes // short for routes: routes
})
App.router = router
new Vue(App).$mount('#app')
