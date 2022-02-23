<template>
  <div class="pedestal">
    <!--这是布局的模板, 用于基座之间的布局-->
    <div class="cus-layout">
      <header class="header">
        <span class="title">Tadpoles</span>
        <span class="userinfo" style="margin-left: 25px">主应用的state：{{ JSON.stringify(state) }}</span>
      </header>
      <section class="container">
        <div class="left-menu">
          <el-menu class="el-menu-vertical-demo" default-active="/qiankun" router>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>主体应用(基座)</span>
              </template>
              <el-menu-item index="/qiankun">乾坤</el-menu-item>
              <el-menu-item index="/prompt">兼容界面</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>Vue</span>
              </template>
              <el-menu-item index="/sub-vue">Vuer2.6</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>React</span>
              </template>
              <el-menu-item index="2-1">React</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">Sub-Html</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content"><router-view /></div>
        <div class="right-menu"></div>
      </section>
    </div>
  </div>
</template>

<script>
import store from '@/store/qiankun/global-state'
export default {
  name: 'layout',
  computed: {
    state() {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.cus-layout {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  .header {
    box-sizing: border-box;
    width: 100%;
    min-width: 1280px;
    height: 48px;
    padding: 0 24px;
    line-height: 48px;
    background-color: #fdfdfd;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 2px 4px 0 rgba(158, 154, 154, 0.3);
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    height: calc(100% - 48px);
    .content {
      width: calc(100% - 280px);
    }
    .left-menu {
      width: 220px;
      border-right: 1px solid #ddd;
      box-shadow: 2px 0 4px 0 rgba(158, 154, 154, 0.3);
    }
    .right-menu {
      width: 60px;
      border-left: 1px solid #ddd;
      box-shadow: -2px 0 4px 0 rgba(158, 154, 154, 0.3);
    }
  }
}
</style>
