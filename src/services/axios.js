import Vue from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { baseURL } from '@/utils/util'

const ContentType = {
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json',
  formData: 'multipart/form-data'
}

// 创建 axios 实例
const baseService = axios.create({
  baseURL,
  timeout: 6000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// request interceptor
baseService.interceptors.request.use(
  config => {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] =
    ContentType[config.data instanceof FormData ? 'formData' : 'json']
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

baseService.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data.resultCode === '000000') {
        return res.data.data
      } else {
        message.error(res.data.resultMsg)
        return false
      }
    } else if (res.status === 401 || res.status === 403) {
      message.error('登录过期或权限不足, 请重新登陆!')
      return false
    } else if (res.status === 500) {
      message.error('请求数据失败, 请重试!')
      console.log(res)
      return false
    }
    return res
  },
  (error) => {
    const msg = error.message
    const result = error.response
    if (result) {
      const { data } = result
      message.error(data.resultMsg)
    } else if (msg) {
      if (msg === 'Network Error') {
        message.error('网络错误,请检查网络!')
      } else {
        message.error(msg)
      }
    } else {
      message.error('未知错误,请重试!')
    }
    console.log(error.toJSON())
    return Promise.reject(error)
  }
)

export default baseService
