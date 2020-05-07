import Vue from 'vue'
import Vue18n from 'vue-i18n'
import cn from '@/locales/cn'
import en from '@/locales/en'

Vue.use(Vue18n)

export default new Vue18n({
  locale: window.localStorage.getItem('lang') || 'cn',
  messages: {
    cn,
    en
  }
})
