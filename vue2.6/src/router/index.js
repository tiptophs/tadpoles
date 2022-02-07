import { initRouter } from '@/common/vue-bucket-init/router'
import { routeInterceptor } from './intercept'

// 抛出router, routes
const { newVueRouter, routes } = initRouter('/home', '/home')
// 创建自定义router
const router = newVueRouter({
  routes,
  // 保证路径统一, 后面的sub-vue是可以随意修改的，前面的需要与基座的保持一致
  base: window.__POWERED_BY_QIANKUN__ ? '/sub-vue/' : '/sub-vue/',
})

// 加载路由守卫
routeInterceptor(router)
//抛出默认路由
export default router
