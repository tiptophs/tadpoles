// 定义所有的微应用
const microApps = [
  {
    name: 'sub-vue',
    entry: '//localhost:8000/',
    activeRule: '/sub-vue',
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: '/sub-vue', // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
    },
  },
  // {
  //   name: 'sub-react',
  //   entry: '//localhost:6001/',
  //   activeRule: '/sub-react',
  //   container: '#subapp-viewport', // 子应用挂载的div
  //   props: {
  //     routerBase: '/sub-react',
  //   },
  // },
]

// 并导出
export default microApps
