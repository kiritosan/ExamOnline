import vue from 'vue'
import VueRouter from 'vue-router'
import {
  teacherData,
  studentData
} from '../utils/navData'

const Login = () =>
  import ('../views/Pages/Login/Login.vue')
const Regist = () =>
  import ('../views/Pages/Login/Regist.vue')
const Home = () =>
  import ('../views/Components/Home/Home.vue')
const UpdatePsw = () =>
  import ('../views/Pages/Login/UpdatePsw.vue')

vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/updatePsw',
    name: 'updatePsw',
    component: UpdatePsw
  },
  {
    path: '/home',
    component: Home,
<<<<<<< HEAD
    children: []
=======
    children: [
      // willem:共有嵌套路由
      {
        // 嵌套路由path不加'/'
        path: 'discussion',
        name: 'discussion',
        meta: {
          text: '提问交流区'
        },
        component: () =>
          import ('../views/Layouts/Discussion/Discussion.vue'),
        children: [
          {
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
>>>>>>> 27ce06902f1a4234de7d08a19c1e24c8dd440a4f
  }
]
let home = routes.find(item => item.path === '/home')

// 动态加载路由
teacherData.forEach(item => {
  home.children.push(item)
})

studentData.forEach(item => {
  // 避免路由重复
  let flag = false
  home.children.forEach(route => {
    if (route.name === item.name) return flag = true
  })
  if (!flag) home.children.push(item)
})

const router = new VueRouter({
  routes,
  // mode: 'history',
})

// 全局路由守卫, 路由跳转没有token直接跳转回login
router.beforeEach((to, from, next) => {
  if (['login', 'regist', 'updatePsw'].includes(to.name)) next()
  else {
    if (!window.localStorage.getItem('token')) next('/login')
    else next()
  }
})

export default router