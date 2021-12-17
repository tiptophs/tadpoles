import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 引入i18n
Vue.use(VueI18n)
// 引入全局的业务多语言
import { message } from './business/i18n.js'
// 引入elementUI语言组
import { mapLanguage } from './element-ui/index'
// 获取当前语言
import { getLanguage } from '@/common/i18n/language'
// 获取elementUI的语言设置
import ElementLocale from 'element-ui/lib/locale'

// 定义多语言
const messages = {
  en: {
    ...message.en,
    ...mapLanguage.en.value,
  },
  zh: {
    ...message.zh,
    ...mapLanguage.zh.value,
  },
  tw: {
    ...message.tw,
    ...mapLanguage.tw.value,
  },
}

// 加载多语言
const i18n = new VueI18n({
  // 语言设置
  locale: getLanguage() || 'zh',
  // 预设的语言环境。
  fallbackLocale: 'zh',
  messages,
  // 是否将根级别语言环境与组件本地化语言环境同步。关闭本地化
  sync: true,
  // 关闭翻译报错
  silentTranslationWarn: true,
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

// 返回设置的多语言i18n
export { i18n }
