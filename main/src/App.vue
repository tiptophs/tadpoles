<template>
  <div id="app">
    <!--展示界面, 需要外加一层布局外壳，防止全屏模式的error等提示无法显示-->
    <router-view />
  </div>
</template>

<script>
// 该问题存在于非public.html和App.vue上的id
// 做了几次尝试, 想采用路由的方式加载子服务表示的id节点, 目前存在一个问题在router.js内,
// 当路由为子路由例如sub-vue时, 因主服务内并没有注册该子路由导致根本加载不上Layout外层。
// 目前考虑的解决方式有两种
// 1: 注册一个空的微服务路由组件，所有的微服务都这样注册进来。这样也处理了默认地址和路由不匹配的问题 (缺点基座路由上多了好多无用的微服务跳转路由)
// 2: 将Layout当作组件的方式加载到App.vue上，不通过路由的方式。(外面的壳固定化了没办法再个性化, 或者说个性化起来比较费劲)
// 3: path '*' 方式内部做数据处理判断
// 采用1,3的方式
import NProgress from 'nprogress'
export default {
  data() {
    return {
      //默认为false
      isLoading: false,
    }
  },
  watch: {
    // 设置loading状态
    isLoading(val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    },
  },
}
</script>
<style lang="less"></style>
