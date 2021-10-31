// 动态路由加载

export let teacherData = [{
    path: "",
    redirect: "info"
  },
  {
    path: 'info',
    name: 'info',
    meta: {
      text: '个人信息'
    },
    component: () =>
      import ('../views/Layouts/Info/Info.vue')
  },
  {
    path: 'assignpaper',
    name: 'assignpaper',
    meta: {
      text: '考试出题'
    },
    component: () =>
      import ('../views/Pages/Teacher/AssignPaper.vue')
  },
  {
    path: 'emresults',
    name: 'emresults',
    meta: {
      text: '考试情况'
    },
    component: () =>
      import ('../views/Pages/Teacher/EmResults.vue')
  },
]

export let studentData = [{
    path: "",
    redirect: "info"
  },
  {
    path: 'info',
    name: 'info',
    meta: {
      text: '个人信息'
    },
    component: () =>
      import ('../views/Layouts/Info/Info.vue')
  },
  {
    path: 'emsubjects',
    name: 'emsubjects',
    meta: {
      text: '考试科目'
    },
    component: () =>
      import ('../views/Pages/Student/EmSubjects.vue')
  },
]