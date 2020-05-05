import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          console.log(result)
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(PERMISSION, Array.isArray(result.role) ? result.role : result.role.split(','))
          Vue.ls.set(USER_INFO, result)
          // TODO:1.mock移到server端
          // 2.修改axios
          // 3.再次精简路由
          // 6.减小clone的包大小
          // 7.调研是否可以在生产模式中动态修改主题颜色(理论上可以因为可以动态修改色弱模式),并且将这个按钮放在用户设置中

          // 已完成内容:
          // 本系统基于ant deign pro vue 官方精简完成, 基于2.0.2tag, 所缺少的文件都可以通过拷贝源文件复制过来
          // 本系统分为两个版本,一般精简(master)和极度精简(simplify),其中一般精简只修改了路由逻辑,按照权限分配(admin,common uer),而不是原版的按照菜单分配(table,list等等),极度精简版就是精简一切能精简的功能
          // 精简文件
          // 精简路由(去掉了异步路由的过程,也不需要在router.beforeEach中动态加载)
          // 国际化
          // 精简登录 (删除手机号登录内容,需要的话可以从官方2.0.2tag复制)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 这个方法一般用不到
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          if (result.role /* && result.role.permissions.length > 0 */) {
            // const role = result.role
            // role.permissions = result.role.permissions
            // role.permissions.map(per => {
            //   if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //     const action = per.actionEntitySet.map(action => { return action.action })
            //     per.actionList = action
            //   }
            // })
            // role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
            Vue.ls.set(PERMISSION, Array.isArray(result.role) ? result.role : result.role.split(','))
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove(PERMISSION)
          Vue.ls.remove(USER_INFO)
        })
      })
    }

  }
}

export default user
