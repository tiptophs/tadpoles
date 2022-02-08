import { initRouter } from '@/common/vue-bucket-init/router'
import { routeInterceptor } from './intercept'
import microApps from '@/config/micro-apps' // 加载微服务的基础路由

// 抛出router, routes (若/跳转的地址为微服务, 该选项将会失效, 可以尝试如上修复)
const { newVueRouter, routes, pathToRouter } = initRouter('/prompt', '/qiankun')
// 注册微服务路由地址
microApps.forEach(item => {
  const microAppRoute = {
    path: `/${item.name}/:chapters*`,
    name: item.name,
    // 添加根层级,字段默认false,处理全屏error等
    isRoot: false,
    // route level code-splitting 代码切割
    // this generates a separate chunk (vant-case.[hash].js) for this route 切割文件hash
    // which is lazy-loaded when the route is visited. 懒加载
    component: () => import(/* webpackChunkName: "microapps" */ '@/components/micro'),
  }
  pathToRouter(routes, microAppRoute)
})
// 创建自定义router
const router = newVueRouter({ routes })
// 加载路由守卫
routeInterceptor(router)
//抛出默认路由
export default router
