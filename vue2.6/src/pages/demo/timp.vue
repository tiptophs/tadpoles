<template>
  <div class="timp" @click="goback">路由测试</div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.push({
        path: '/others',
        query: {
          name: 'huang',
          value: 'shuo',
        },
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
