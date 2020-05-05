import Vue from 'vue'
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { PERMISSION } from '@/store/mutation-types'
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param roles
 * @param route
 * @returns {boolean}
 */
export function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(s => roles.includes(s))
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

export function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        const roles = Vue.ls.get(PERMISSION)
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
