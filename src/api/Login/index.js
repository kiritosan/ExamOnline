import {
  request
} from "../../utils/request";

// 老师注册
export function tregist(data) {
  return request({
    method: 'PUT',
    url: '/tregistLogin/regist',
    data
  })
}

// 学生注册
export function sregist(data) {
  return request({
    method: 'PUT',
    url: '/sregistLogin/regist',
    data
  })
}

// 老师登录
export function tlogin(data) {
  return request({
    method: 'POST',
    url: '/tregistLogin/login',
    data
  })
}

// 学生登录
export function slogin(data) {
  return request({
    method: 'POST',
    url: '/sregistLogin/login',
    data
  })
}

// 老师学生找回密码
// 发送验证码
export function getCode(params) {
  return request({
    method: 'GET',
    url: '/same/getCode',
    params
  })
}

// 校验验证码
export function checkCode(data) {
  return request({
    method: 'POST',
    url: '/same/checkCode',
    data
  })
}

// 修改密码
export function updatePsw(data) {
  return request({
    method: 'POST',
    url: '/same/updatePsw',
    data
  })
}