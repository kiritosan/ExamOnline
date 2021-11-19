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
  {
    path: 'discussion',
    meta: {
      text: '提问交流'
    },
    component: () =>
      import ('../views/Layouts/Discussion/Discussion.vue'),
    children: [{
        path: '',
        redirect: 'discussion-index'
      },
      {
        path: 'discussion-index',
        name: 'discussion-index',
        meta: {
          text: '问题列表'
        },
        component: () =>
          import ('../views/Layouts/Discussion/DiscussionIndex.vue')
      },
      {
        path: 'answers',
        name: 'answers',
        meta: {
          text: '回答'
        },
        component: () =>
          import ('../views/Layouts/Discussion/Answers.vue')
      }
    ]
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
  {
    path: 'discussion',
    name: 'discussion',
    meta: {
      text: '提问交流区'
    },
    component: () =>
      import ('../views/Layouts/Discussion/Discussion.vue'),
    children: [{
        path: '',
        name: 'discussion-index',
        meta: {
          text: '问题列表'
        },
        component: () =>
          import ('../views/Layouts/Discussion/DiscussionIndex.vue')
      },
      {
        path: 'answers',
        name: 'answers',
        meta: {
          text: '回答'
        },
        component: () =>
          import ('../views/Layouts/Discussion/Answers.vue')
      }
    ]
  },
]