import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { i18n } from '@/common/i18n/index'
import 'normalize.css'
// 乾坤子应用
import './public-path'

// 取消console内的提示信息
Vue.config.productionTip = false

// 按需加载常用的vant组件
import elComponents from './config/uiframe.js'
elComponents.forEach(item => {
  Vue.use(item)
})

// 将渲染操作定义为函数
let instance = null
function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 到处三个生命周期函数
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
