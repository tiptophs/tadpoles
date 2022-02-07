import { initRouter } from '@/common/vue-bucket-init/router'
import { routeInterceptor } from './intercept'
import microApps from '@/config/micro-apps' // 加载微服务的基础路由

// 抛出router, routes
const { newVueRouter, routes } = initRouter('/prompt', '/sub-vue')
microApps.forEach(item => {
  const microRouter = {
    path: `/${item.name}/*`,
    name: item.name,
    meta: '', // 影响目前还不晓得
    isRoot: false, // 全部默认为false
    component: () => import(/* webpackChunkName: "microapps" */ '@/components/micro'),
  }
  routes[0].children.unshift(microRouter)
})
// 创建自定义router
const router = newVueRouter({ routes })

// 加载路由守卫
routeInterceptor(router)
//抛出默认路由
export default router
