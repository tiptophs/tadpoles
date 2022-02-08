import { initRouter } from '@/common/vue-bucket-init/router'
import { routeInterceptor } from './intercept'
import microApps from '@/config/micro-apps' // 加载微服务的基础路由

// 重写不存在路由的情况下界面的跳转，微服务的路由地址会进入这里
const microRouter = {
  path: '*',
  isRoot: false, // 全部默认为false
  beforeEnter: (to, from, next) => {
    const isMicro = microApps.map(item => { return item.name }).indexOf(to.path.split('/')['1']) !== -1
    // 需要条件
    isMicro? next() : next('/prompt')
  },
  component: () => import(/* webpackChunkName: "microapps" */ '@/components/micro'),
}
// 抛出router, routes
const { newVueRouter, routes } = initRouter(microRouter, '/sub-vue')
console.log(routes, '===xxxx=')
// 创建自定义router
const router = newVueRouter({ routes })
// 加载路由守卫
routeInterceptor(router)
//抛出默认路由
export default router
