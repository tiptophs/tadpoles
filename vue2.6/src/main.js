import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { i18n } from '@/common/i18n/index'
import 'normalize.css'
import './public-path' // 乾坤子应用
import globalRegister from '@/common/qiankun/global-register'

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

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑
  // 独立运行时，也注册一个名为global的store module
  globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

// 导处三个生命周期函数
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  // 设置高度和宽度沾满当前容器
  props.container.style.height = '100%'
  props.container.style.width = '100%'
  globalRegister(store, props)

  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  // router = null
}
