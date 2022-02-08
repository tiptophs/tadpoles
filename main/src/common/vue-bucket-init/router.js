import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入最外层的模板架子, 目前为空架子
import Layout from '@/components/layout/index.vue'
// 解决路由异常问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// 注册路由
Vue.use(VueRouter)

/**
 * 将各个业务路由信息添加到router,检查合法性，注意console内是否有黄色或红色警告
 * (父子之间未做检测，可看console黄色警告)
 * @param routes Obejct 现存路由信息
 * @param pathInfo Object 路由路径
 */
function pathToRouter(routes, pathInfo) {
  // 要循环检查的list
  const checkList = pathInfo.isRoot ? routes : routes[0].children
  // 根节点, 判断name和path的合法性
  checkList.forEach(item => {
    if (item.path === pathInfo.path || item.name === pathInfo.name) {
      throw new Error(`命名非法:${pathInfo.path} --- ${pathInfo.name}`)
    }
  })
  checkList.push(pathInfo)
}

/**
 * 定义router的初始化方法
 * @param  {String} noPath  非匹配路由跳转地址
 * @param  {String} rootDirect 根节点/地址
 * @return {Object} router
 */
const initRouter = function (noPath, rootDirect) {
  // 定义非匹配路由的跳转地址
  const _NO_MATCH_ROUTER_PATH = noPath
  // 定义输入/根节点后的redirect
  const _ROOT_MATCH_REDIRECT = rootDirect

  // 定义通用路由
  const routes = [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: _ROOT_MATCH_REDIRECT,
      children: [],
    },
  ]

  // 加载pages内业务模块(未考虑开发的时候的key重复问题, 所以必须强制路由的path和name定义格式)
  // 目前给出结论为：route.js 仅存在于一级目录, 否则抛出异常。
  const pageRoutes = require.context('../../pages', true, /route\.js$/)
  pageRoutes.keys().forEach(key => {
    // 验证代码key的路径是否为1级，否则抛出异常
    if (key.split('/').length != 3) {
      throw new Error(`当前路径：${key}层级异常`)
    }
    const routeDefault = pageRoutes(key).default
    if (Array.isArray(routeDefault)) {
      routeDefault.forEach(route => {
        pathToRouter(routes, route)
      })
    } else {
      pathToRouter(routes, routeDefault)
    }
  })

  // 抛出创建router的方法，而不是直接返回创建后的对象
  function newVueRouter(config) {
    const defaultConfig = {
      mode: 'history',
      base: process.env.BASE_URL,
      routes,
    }
    const mixConfig = Object.assign(defaultConfig, config)
    // 路由通配符,当项目无法匹配到相应的路由地址将会走这里,他必须写在最下面
    if (typeof _NO_MATCH_ROUTER_PATH === 'object') {
      pathToRouter(mixConfig.routes, _NO_MATCH_ROUTER_PATH)
    } else {
      mixConfig.routes.push({
        path: '*',
        beforeEnter: (to, from, next) => {
          next(_NO_MATCH_ROUTER_PATH)
        },
      })
    }

    return new VueRouter(mixConfig)
  }
  return {
    newVueRouter,
    routes,
  }
}

// 抛出路由
export { initRouter }
