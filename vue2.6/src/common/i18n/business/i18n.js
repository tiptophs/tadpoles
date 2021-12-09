import { camelCase } from 'camel-case'
// 通用文案定义在global中
const message = {
  zh: {
    global: {
      global: 'global11111',
      hello: 'hello-golbal',
    },
  },
  en: {
    global: {
      global: '全局',
      hello: 'hello-全局',
    },
  },
  tw: {
    global: {
      global: '繁体',
      hello: 'hello-繁体',
    },
  },
}

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
