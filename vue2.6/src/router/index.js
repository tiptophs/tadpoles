import { initRouter } from '@/common/vue-bucket-init/router'
import { routeInterceptor } from './intercept'

// 抛出router, routes
const { newVueRouter, routes } = initRouter('/home', '/home')

console.log(window.__POWERED_BY_QIANKUN__, '===')
// 创建自定义router
const router = newVueRouter({
  routes,
  base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/app-vue',
})

// 加载路由守卫
routeInterceptor(router)
//抛出默认路由
export default router
