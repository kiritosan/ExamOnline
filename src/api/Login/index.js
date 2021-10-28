import {
  request
} from "../../utils/request";

// 老师注册
export function tregist(query) {
  return request({
    method: 'PUT',
    url: '/tregistLogin/regist',
    data: JSON.stringify(query),

  })
}

// 学生注册
export function sregist(query) {
  return request({
    method: 'PUT',
    url: '/sregistLogin/regist',
    data: JSON.stringify(query)
  })
}

// 老师u登录
export function tlogin(query) {
  return request({
    method: 'POST',
    url: '/tregistLogin/login',
    data: JSON.stringify(query)
  })
}

// 学生登录
export function slogin(query) {
  return request({
    method: 'POST',
    url: '/sregistLogin/login',
    data: JSON.stringify(query)
  })
}