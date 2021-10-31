import {
  request
} from "../../utils/request";

// 1.老师相关
// 获取老师全部试卷
export function getTeacherAllPapers(params) {
  return request({
    method: 'GET',
    url: '/tpaper/getAllPapers',
    params
  })
}

// 老师更新试卷状态信息（名称、截止时间）
export function updatePaperInfo(data) {
  return request({
    method: 'POST',
    url: '/tpaper/updatePaperInfo',
    data
  })
}

// 老师创建空白试卷
export function createOnePaper(params) {
  return request({
    method: 'GET',
    url: '/tpaper/createOnePaper',
    params
  })
}

// 老师往空白试卷添加题目
export function updateQuestion(data) {
  return request({
    method: 'POST',
    url: '/tquestion/updateQuestion',
    data
  })
}

// 老师查看试卷
export function getQuestions(params) {
  return request({
    method: 'GET',
    url: '/tquestion/getQuestions',
    params
  })
}

// 老师删除试卷
export function deleteOnePaper(params) {
  return request({
    method: 'GET',
    url: '/tpaper/deleteOnePaper',
    params
  })
}


// 获取时间
export function getTime() {
  let date = new Date()
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getHours() + ':' + date.getSeconds()
}



// 2.学生相关

// 获取学生所有课程
export function getStudentClasses(params) {
  return request({
    method: 'GET',
    url: '/studentClass/getClasses',
    params
  })
}

// 获取学生对应课程下的所有试卷
export function getStudentAllPapers(params) {
  return request({
    method: 'GET',
    url: '/spaper/getPapers',
    params
  })
}

// 学生获取对应试卷的答案
export function getStudentAnswers(params) {
  return request({
    method: 'GET',
    url: '/paperAnswer/getAnswers',
    params
  })
}