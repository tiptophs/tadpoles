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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 32px;
  font-weight: bold;
  .title {
    width: 425px;
    text-align: center;
    .content {
      font-size: 18px;
      ul {
        display: flex;
        justify-content: space-between;
        list-style-type: disclosure-closed;
      }
    }
  }
}
</style>
