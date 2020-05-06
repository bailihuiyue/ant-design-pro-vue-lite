// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, roles: ['admin'] },
        children: [
          {
            path: 'analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, roles: ['admin'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: '监控页（外部）', target: '_blank' }
          },
          {
            path: 'test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '测试功能', keepAlive: true, roles: ['admin'] }
          }
        ]
      },
      {
        path: 'dashboard1',
        name: 'dashboard1',
        redirect: '/dashboard1/403',
        component: RouteView,
        meta: { title: '测试', keepAlive: true, icon: bxAnaalyse, roles: ['admin'] },
        children: [
          {
            path: '403',
            name: '403',
            component: () => import('@/views/exception/403'),
            meta: { title: '403', keepAlive: true, roles: ['admin'] }
          },
          {
            path: '404',
            name: '404',
            component: () => import('@/views/exception/404'),
            meta: { title: '404', keepAlive: true, roles: [ 'admin1' ] }
          },
          {
            path: '500',
            name: '500',
            component: () => import('@/views/exception/500'),
            meta: { title: '500', keepAlive: true, roles: ['admin', 'admin1'] }
          }
        ]
      }
    ]
  },
  // Exception
  {
    path: '/exception',
    name: 'exception',
    component: BasicLayout,
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
    hidden: true,
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
    hidden: true
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

export const asyncRouterMap = [

]
