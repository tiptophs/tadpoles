// 定义所有的微应用  https://qiankun.umijs.org/zh/api#registermicroappsapps-lifecycles
const microApps = [
  {
    name: 'sub-vue',  // 必选，微应用的名称，微应用之间必须确保唯一
    entry: '//localhost:8000/', // 必选，微应用的入口
    container: '#subapp-viewport', // 必选 子应用挂载的div
    activeRule: '/sub-vue', // 必选，微应用的激活规则。
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
