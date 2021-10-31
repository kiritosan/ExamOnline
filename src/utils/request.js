// 此模块为请求封装模块
import axios from 'axios'

export function request(options) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
      'content-type': 'application/json'
    }
  })

  //拦截请求
  instance.interceptors.request.use(config => {
    // 给每个请求携带token
    let token = window.localStorage.getItem('token')
    config.headers.Authorization = token
    return config
  })
  return instance(options)
}