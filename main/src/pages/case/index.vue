<template>
  <div class="home">
    <div class="title">
      <img alt="Vue logo" src="./source/img/logo.png" />
      <div>hello Vue2.6 App</div>
      <div class="content">
        <h3>Vue Document</h3>
        <ul>
          <li>
            <a href="https://cn.vuejs.org/v2/guide/" rel="noopener" target="_blank">vue官网学习</a>
          </li>
          <li>
            <a href="https://element.eleme.cn/#/zh-CN" rel="noopener" target="_blank">Element UI</a>
          </li>
          <li>
            <router-link :to="{ name: 'case', query: {} }">Demo展示</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  font-size: 32px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    width: 425px;
    .content {
      font-size: 18px;
      ul {
        list-style-type: disclosure-closed;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
