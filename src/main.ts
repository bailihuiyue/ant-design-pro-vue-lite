// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from '@/locales/i18n'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './proComponents/global.less'
import { Dialog } from '@/proComponents'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false

Vue.use(Dialog)
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
