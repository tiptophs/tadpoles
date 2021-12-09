<template>
  <div class="test">
    <el-table class="demo" :data="tableData" style="width: 100%">
      <el-table-column label="日期" prop="date" width="180"> </el-table-column>
      <el-table-column label="姓名" prop="name" width="180"> </el-table-column>
      <el-table-column label="地址" prop="address"> </el-table-column>
    </el-table>
    <timp></timp>
    <div>{{ $t('global') }}</div>
    <div>{{ $t('hello') }}</div>

    <el-calendar v-model="value"> </el-calendar>
  </div>
</template>

<script>
import timp from './timp'
export default {
  metaInfo: {
    title: 'profile page',
  },
  components: {
    timp,
  },
  props: {},
  data() {
    return {
      value: new Date(),
      tableData: [
        {
          date: '2016-05-02',
          name: this.$t('hello'),
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: this.$t('hello'),
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: this.$t('hello'),
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: this.$t('hello'),
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
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
.demo {
  width: 0%;
  height: 100%;
}
</style>
<i18n src="./i18n.json"></i18n>
