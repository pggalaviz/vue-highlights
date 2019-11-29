import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHighlights, { autoLink, autoHighlight } from '../src'
import App from './App.vue'
import Home from './Home.vue'
import Docs from './Docs.vue'

import './styles/main.styl'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/docs', name: 'docs', component: Docs },
    { path: '*', component: Home }
  ]
})

Vue.component(VueHighlights.name, VueHighlights)
Vue.prototype.$autoLink = autoLink
Vue.prototype.$autoHighlight = autoHighlight

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
