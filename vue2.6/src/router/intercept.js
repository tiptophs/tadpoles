const routeInterceptor = router => {
  // 定义路由导航守卫(全局, 慎重加逻辑和同步请求数据, 会导致页面响应速度变慢)
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
  router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title
    if (title) {
      document.title = title
    }
    next()
  })
}

export { routeInterceptor }
