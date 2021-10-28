import vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import ('../views/Pages/Login/Login.vue')
const Regist = () =>
  import ('../views/Pages/Login/Regist.vue')
const Home = () =>
  import ('../views/Components/Home/Home.vue')
const Index = () =>
  import ('../views/Pages/Index/Index.vue')
const About = () =>
  import ('../views/Pages/About/About.vue')
const Team = () =>
  import ('../views/Pages/Team/Team.vue')
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
    name: 'home',
    component: Home,
    children: [{
        path: "",
        redirect: "index"
      }, {
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'team',
        name: 'team',
        component: Team
      },
      {
        path: 'index',
        name: 'index',
        component: Index
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})


// 全局路由守卫, 没有token直接跳转回login
router.beforeEach((to, from, next) => {
  if (['login', 'regist', 'updatePsw'].includes(to.name)) next()
  else {
    if (!window.localStorage.getItem('token')) next('/login')
    else next()
  }
})


export default router