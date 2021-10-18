import vue from 'vue'
import VueRouter from 'vue-router'


vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () =>
      import ('../views/Components/Login/Login.vue')
  },
  {
    path: '/setup',
    component: () =>
      import ('../views/Components/Login/SetUp.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router