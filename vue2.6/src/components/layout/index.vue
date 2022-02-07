<template>
  <div class="micro-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'layout',
}
</script>

<style lang="less" scoped>
.micro-container {
  width: 100%;
  height: 100%;
}
</style>
