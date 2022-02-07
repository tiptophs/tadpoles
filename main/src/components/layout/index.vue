<template>
  <div class="pedestal">
    <!--这是布局的模板, 用于基座之间的布局-->
    <div class="cus-layout">
      <header class="header">
        <button @click="aaa">1111</button>
      </header>
      <section class="container">
        <div class="left-menu"></div>
        <div class="content"><router-view /></div>
        <div class="right-menu"></div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  methods: {
    aaa() {
      console.log('222')
    },
  },
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
