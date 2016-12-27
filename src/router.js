import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ApplyDel from './components/ApplyDel'
import Login from './components/Login'
import BioList from './components/BioList'
import BioEditor from './components/BioEditor'

// import PublicGod from './components/PublicGod'
// import God from './components/God'

const routes = [
  { path: '/', redirect: '/BioList' },
  { path: '/ApplyDel', component: ApplyDel },
  { path: '/Login', component: Login },
  { path: '/BioList', component: BioList },
  { path: '/BioEditor/:id*', name: 'BioEditor', component: BioEditor }
  // { path: '/TheMessage', component: TheMessage },
  // { path: '/God/:god_name', component: God },
  // { path: '/PublicGod/:cat*', component: PublicGod }
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
