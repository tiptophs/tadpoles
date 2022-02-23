// qiankun 全局公用存储便变量
import { initGlobalState } from 'qiankun'
import Vue from 'vue'

// 父应用的初始state
// Vue.observable是为了让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
const initialState = Vue.observable({
  user: {
    name: 'zhangsan',
  },
})

const actions = initGlobalState(initialState)

// onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void，
// 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
actions.onGlobalStateChange((newState, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('main change', JSON.stringify(newState), JSON.stringify(prev))
  for (const key in newState) {
    initialState[key] = newState[key]
  }
})

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = key => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState
}
export default actions
