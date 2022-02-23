<template>
  <div class="home">
    <div class="global-state-demo">
      <div>全局状态通信</div>
      <div class="btns"><el-button type="primary" @click="changeUsername">点击修改状态</el-button></div>
    </div>
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
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    // 通过global获取user的信息
    ...mapState('global', {
      user: state => state.user,
    }),
    isInQiankun() {
      return window.__POWERED_BY_QIANKUN__
    },
  },
  methods: {
    // setGlobalState 是在 /common/src/store/global-register.js中定义的
    ...mapActions('global', ['setGlobalState']),
    changeUsername() {
      // 也可通过 store.commit('global/setGlobalState', { user: '李四' }) 进行操作
      this.setGlobalState({
        user: { name: '李四' + Math.round(Math.random() * 100) },
      })
    },
  },
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
