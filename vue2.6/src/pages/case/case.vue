<template>
  <div class="case-container">
    <div class="lang-test">
      <span>{{ $t('global.uname') }}<span>张三</span></span>
      <span>{{ $t('global.age') }}<span>12</span></span>
      <!--切换语言按钮-->
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" size="mini" :value="item.value">
        </el-option>
      </el-select>
    </div>
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
    <!-- <el-calendar v-model="dataTime"> </el-calendar> -->

    <div class="timp" @click="goback">路由测试</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTime: new Date(),
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
    }
  },
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

<style lang="less" scoped>
.lang-test {
  text-align: center;
  width: 100%;
  border: 1px solid #ccc;
  padding: 15px;
  span {
    margin-right: 25px;
  }
}
</style>
