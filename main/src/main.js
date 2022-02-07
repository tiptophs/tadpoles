import Vue from 'vue'
import App from './App.vue'
// 引入封装侯的router, vuex, i18b
import router from './router'
import store from '@/store'
import { i18n } from '@/common/i18n/index'
// 引入底层样式
import 'normalize.css'
// 引入乾坤主框架, 和微应用路径
import microApps from './config/micro-apps'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'

// 取消console内的提示信息
Vue.config.productionTip = false

// 按需加载常用的vant组件
import elComponents from './config/uiframe.js'
elComponents.forEach(item => {
  Vue.use(item)
})

// 渲染主应用
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
})
  .$mount('#app')
  .$nextTick(() => {
    console.log(document.getElementById('app'), 'app应用挂载')
  })

// 注册微应用
registerMicroApps(microApps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    },
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
    },
  ],
  beforeUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    },
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    },
  ],
})

start()
