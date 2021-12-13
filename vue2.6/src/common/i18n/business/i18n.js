import { camelCase } from 'camel-case'
import { message } from '@/config/lang'

// 语言列表
const langs = Object.keys(message)
const pages = require.context('@/pages/', true, /i18n\.json$/)

function getI18n(func, str) {
  func.keys().forEach(modulePath => {
    const pathArr = modulePath.split('/')
    if (pathArr.length !== 3) {
      throw new Error(`i18n.json层级异常，路径：${modulePath}`)
    }
    const moduleName = str + camelCase(pathArr[1])
    const content = func(modulePath)
    // 循环塞入多语言
    langs.forEach(lang => {
      if (message[lang][moduleName]) {
        throw new Error(`存在重复的目录名，路径：${modulePath}`)
      }
      message[lang][moduleName] = content[lang]
    })
  })
}

getI18n(pages, '')
// 抛出message
export { message }
