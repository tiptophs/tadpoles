// path和name命名规则，以文件夹名称为主，防止在加载的时候name冲突
export default {
  path: '/demo',
  name: 'demo',
  // 元信息
  meta: {
    title: 'vant',
  },
  // 添加根层级,字段默认false,处理全屏error等
  isRoot: false,
  // route level code-splitting 代码切割
  // this generates a separate chunk (vant-demo.[hash].js) for this route 切割文件hash
  // which is lazy-loaded when the route is visited. 懒加载
  component: () => import(/* webpackChunkName: "vant-demo" */ '@/pages/demo/index.vue'),
}
