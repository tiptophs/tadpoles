<template>
  <div class="case-container">
    <!--table列表-->
    <!-- <el-table class="demo" :data="tableData" style="width: 100%">
      <el-table-column label="日期" prop="date" width="180"> </el-table-column>
      <el-table-column label="姓名" prop="name" width="180"> </el-table-column>
      <el-table-column label="地址" prop="address"> </el-table-column>
    </el-table>
    <timp></timp>
    <div>{{ $t('global') }}</div>
    <div>{{ $t('hello') }}</div> -->

    <!--日历-->
    <!-- <el-calendar v-model="value"> </el-calendar> -->

    <div class="timp" @click="goback">路由测试</div>
  </div>
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
