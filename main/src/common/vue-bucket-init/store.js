import Vue from 'vue'
import Vuex from 'vuex'
import { camelCase } from 'camel-case'
Vue.use(Vuex)

/**
 * 获取资源模块
 * @param modulesFiles Webpack_require
 * @param formatName function 格式化文件名称
 */
function getModules(modulesFiles, formatName) {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    let moduleName = ''
    if (typeof formatName === 'function') {
      moduleName = formatName(modulePath, modules)
    } else {
      moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    }
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
  return modules
}

// 通用store加载逻辑,自动注册
const baseStore = getModules(require.context('../../store/automatic', false, /\.js$/), path => {
  return camelCase(path.replace(/^\.\/(.*)\.\w+$/, '$1'))
})

// 业务store加载逻辑
const pageStore = getModules(
  require.context('../../pages/', true, /store\.js$/),
  (path, modules) => {
    const keyName = camelCase(path.split(/\//).reverse()[1])
    // 业务逻辑里面添加store.js 按照上级文件名命名，多层嵌套防止key重复，需要添加验证
    if (Object.keys(modules).includes(keyName)) {
      throw new Error('存在重复的key:' + path)
    } else {
      return keyName
    }
  },
)

/**
 * 定义store的初始化方法
 * @param  {Object} manualImport  非匹配路由跳转地址
 * @return {Object} store
 */
const initStore = manualImport => {
  // 需要进行keys的验证，防止重复覆盖，并给出提示
  const keys = [...Object.keys(baseStore), ...Object.keys(pageStore), ...Object.keys(manualImport)]
  if (keys.length !== [...new Set(keys)].length) {
    throw new Error('存在重复的key:' + keys.toString())
  }

  // 抛出vuex
  return new Vuex.Store({
    //在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
    //这能保证所有的状态变更都能被调试工具跟踪到。
    strict: process.env.NODE_ENV !== 'production',
    modules: Object.assign(baseStore, pageStore, manualImport),
  })
}

//抛出store的初始化方法
export { initStore }
