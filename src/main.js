import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@/assets/css/base.css'
import axios from 'axios'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')

axios({
  method: 'get',
  url: 'http://123.207.32.32:8000/home/multidata'
}).then(data => {
  console.log(data);
})