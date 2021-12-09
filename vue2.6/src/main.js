import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { i18n } from '@/common/i18n/index'
import 'normalize.css'

// 取消console内的提示信息
Vue.config.productionTip = false

// 按需加载常用的vant组件
import elComponents from './config/uiframe.js'
elComponents.forEach(item => {
  Vue.use(item)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
