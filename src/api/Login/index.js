import {
  request
} from "../../utils/request";

// 老师注册
export function tregist(query) {
  return request({
    method: 'PUT',
    url: '/tregistLogin/regist',
    data: JSON.stringify(query)
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