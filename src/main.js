import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Message from './views/Layouts/Message'
import '@/assets/css/base.css'
Vue.use(Message); // 因为我们的对象上定义了 install 方法, 所以可以直接调用 Vue 的 use 方法

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')

//注册全局提示组件