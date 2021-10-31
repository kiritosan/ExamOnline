import {
  request
} from "../../utils/request";

// 1.老师相关
// 老师注册
export function tregist(data) {
  return request({
    method: 'PUT',
    url: '/tregistLogin/regist',
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

// 2.学生相关
// 学生注册
export function sregist(data) {
  return request({
    method: 'PUT',
    url: '/sregistLogin/regist',
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

// 3.公共
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

// 获取cookie中保存的用户名
export function getUserAccount() {
  let userDetails = {}
  document.cookie.split(';').forEach((item) => {
    userDetails[item.split('=')[0].trim()] = item.split('=')[1].trim()
  })
  return userDetails.userName
}