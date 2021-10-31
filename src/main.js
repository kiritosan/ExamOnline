import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Message from './views/Layouts/Message'
import '@/assets/css/base.css'
// 因为我们的对象上定义了 install 方法, 所以可以直接调用 Vue 的 use 方法
Vue.use(Message);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,
}).$mount('#app')

// 解决vue-router版本问题控制台报错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}