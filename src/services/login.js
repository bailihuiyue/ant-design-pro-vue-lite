import baseService from '@/services/axios'

export function login (parameter) {
  const api = '/auth/login'
  return baseService.post(api, { ...parameter })
}

export function logout () {
  const api = '/auth/logout'
  return baseService.post(api)
}
