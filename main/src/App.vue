<template>
  <div id="app">
    <!--展示界面, 需要外加一层布局外壳，防止全屏模式的error等提示无法显示-->
    <router-view />
  </div>
</template>

<script>
// 该问题近存在于非public.html和App.vue上的id
// 做了几次尝试, 想采用路由的方式加载子服务表示的id节点, 目前存在一个问题在router.js内,
// 当路由为子路由例如sub-vue时, 因主服务内并没有注册该子路由导致根本加载不上Layout外层。
// 目前考虑的解决方式有两种
// 1: 注册一个空的微服务路由组件，所有的微服务都这样注册进来。这样也处理了默认地址和路由不匹配的问题 (缺点基座路由上多了好多无用的微服务跳转路由)
// 2: 将Layout当作组件的方式加载到App.vue上，不通过路由的方式。(缺点：不存在的路由不能再redirect了，要手动指定. 2: 外面的壳固定化了没办法再个性化)
// 采用1的方式
export default {}
</script>
<style lang="less"></style>
