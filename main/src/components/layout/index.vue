<template>
  <!--这是布局的模板, 用于基座之间的布局-->
  <div class="cus-layout">
    <header class="header"></header>
    <section class="container">
      <div class="left-menu"></div>
      <div class="content"><router-view /></div>
      <div class="right-menu"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'layout',
}
</script>

<style lang="less" scoped>
.cus-layout {
  height: 100vh;
  width: 100vw;
  .header {
    box-shadow: 0 2px 4px 0 rgba(158, 154, 154, 0.3);
    box-sizing: border-box;
    width: 100%;
    min-width: 1280px;
    padding: 0 24px;
    height: 48px;
    line-height: 48px;
    background-color: #fdfdfd;
    border-bottom: 1px solid #ddd;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - 48px);
    .content {
      flex: 1;
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
