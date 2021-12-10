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
            <router-link :to="{ name: 'case', query: {} }">Demo展示</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '首页',
  },
  components: {},
  props: {},
  data() {
    return {
      value: new Date(),
    }
  },

  beforeCreate() {},
  created() {
    console.log(process.env.NODE_ENV, '==============')
    //打印总体store
    console.log(this.$store)
    // 调用mutations的方法修改state
    this.$store.commit('account/setUserNameIds', {
      name: '张三',
      uid: '10001',
    })
    // getters的方式输出内容
    console.log(this.$store.getters['account/getUserNameIds'], 'store')
    // actions调用方法
    this.$store.dispatch('account/axiosSetUameIds')
    console.log(this.$store.state.account.info)
  },
  mounted() {
    console.log(this.$i18n, 'i18n')
    console.log(this.$t)
    console.log(this, 'this-vue')
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    test() {},
  },
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
