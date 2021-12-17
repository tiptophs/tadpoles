// 引入elementUI多语言部分
import en from 'element-ui/lib/locale/lang/en'
import zh from 'element-ui/lib/locale/lang/zh-CN'
import tw from 'element-ui/lib/locale/lang/zh-TW'

// 自定义element-ui的语音 example: en.el.datepicker.prevMonth = '上个月'

// 抛出语言map对应表
const mapLanguage = {
  en: { key: 'en', value: en },
  zh: { key: 'zh', value: zh },
  tw: { key: 'tw', value: tw },
}

// 导出语言对象
export { mapLanguage }
