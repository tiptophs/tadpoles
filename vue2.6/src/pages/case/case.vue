<template>
  <div class="case-container">
    <div class="lang-test">
      <span class="goback" @click="goback">返回</span>
      <span>{{ $t('global.uname') }}<span>张三</span></span>
      <span>{{ $t('global.age') }}<span>12</span></span>
      <!--切换语言按钮-->
      <el-select v-model="lang" placeholder="请选择语言" size="small" @change="changeLang">
        <el-option v-for="item in language" :key="item.key" :label="item.label" :value="item.key"> </el-option>
      </el-select>
      <div class="lang-scope-area">{{ $t('case.vue') }}</div>
    </div>
    <!--table列表-->
    <div class="el-components">
      <!--日历-->
      <div class="e-calendar">
        <el-calendar v-model="dataTime"> </el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import { language, tableData } from './config'
import { setLanguage, getLanguage } from '@/common/i18n/language'
export default {
  data() {
    return {
      dataTime: new Date(),
      language: Object.freeze(language),
      tableData,
      // 默认中文
      lang: getLanguage(),
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
    // 切换语言
    changeLang(lang) {
      this.$i18n.locale = lang
      setLanguage(lang)
    },
    // 返回
    goback() {
      this.$router.push({
        path: '/home',
        query: {
          name: 'zhang',
          value: 'san',
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
  .goback {
    float: left;
    border: 1px solid #dadada;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 25px;
    &:hover {
      background: lightblue;
      color: white;
    }
  }
  .lang-scope-area {
    margin-top: 25px;
    text-align: center;
    padding: 30px 225px;
  }
}
.el-components {
  text-align: center;
  .e-calendar {
    width: 625px;
  }
}
</style>
