import Vue from 'vue'
import Vue18n from 'vue-i18n'
import cn from '@/locales/cn'
import en from '@/locales/en'

// #region ******自动导入多语言功能,如不使用,自己导入语言文件即可************
// TODO:bug: require.context('../../', true, /en.ts$/)写en.ts就报错,不知道原因,因此该功能暂时放弃
// import { genLangs } from '@/utils/batchImportFiles'
// // 如需开启,需要安装如下两个库
// "@types/node": "^17.0.18",
// "@types/webpack-env": "^1.16.3",

// tsconfig.json添加如下内容
// compilerOptions:{
//   "types": [
//     "node",
//     "webpack-env"
//   ]
// }

// const includePath = ['locales', 'views', 'components']
// // 增加新语言只增加下面两句话和对应的问题件即可
// let cn: any = require.context('../../', true, /cn.ts$/)
// cn = genLangs(cn, includePath)

// let en: any = require.context('../../', true, /en.ts$/)
// en = genLangs(en, includePath)

// #endregion ******自动导入多语言功能************

Vue.use(Vue18n)

export default new Vue18n({
  locale: window.localStorage.getItem('lang') || 'cn',
  messages: {
    cn,
    en
  }
})
