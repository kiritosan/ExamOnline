import {
  request
} from "../../utils/request";

// 1.老师相关

// 获取老师信息
export function getTeacherInfo(params) {
  return request({
    method: 'GET',
    url: '/tinfor/Infor',
    params
  })
}

// 获取老师课程
export function getTeacherClasses(params) {
  return request({
    method: 'GET',
    url: '/teacherClass/getClasses',
    params
  })
}

// 修改老师信息
export function updateTeacherInfo(data) {
  return request({
    method: 'POST',
    url: '/tinfor/updateInfo',
    data
  })
}

// 获取老师能选课列表
export function getAllTeacherCanTeach(params) {
  return request({
    method: 'GET',
    url: '/teacherClass/getAllCanTeach',
    params
  })
}

// 老师选课
export function chooseTeacherClasses(data) {
  return request({
    method: 'POST',
    url: '/teacherClass/chooseTeach?tnum=' + data.tnum,
    data: data.classList
  })
}

// 2.学生相关
// 获取学生信息
export function getStudentInfo(params) {
  return request({
    method: 'GET',
    url: '/sinfor/Infor',
    params
  })
}

// 获取学生课程
export function getStudentClasses(params) {
  return request({
    method: 'GET',
    url: '/studentClass/getClasses',
    params
  })
}

// 修改学生信息
export function updateStudentInfo(data) {
  return request({
    method: 'POST',
    url: '/sinfor/updateInfo',
    data
  })
}

// 3.公共
// 更新头像
export function uploadAvatar(data) {
  return request({
    method: 'POST',
    url: '/same/uploadPhoto',
    headers: {
      'content-type': 'multipart/form-data'
    },
    data
  })
}
// 获取头像
export function getAvatar(params) {
  return request({
    method: 'GET',
    url: '/same/getPhoto',
    params
  })
}

// 得到所有学院
export function getAllColleges(params) {
  return request({
    method: 'GET',
    url: '/college/getAllColleges',
    params
  })
}