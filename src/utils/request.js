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
  return instance(options)
}