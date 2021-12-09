// 全局通用的store, 不会自动挂载, 根据需要手动挂载
export default {
  namespaced: true,
  // state需要返回一个函数, 原理与data类似, 创建多个实例防止state共享一份数据
  state: () => ({}),
  mutations: {},
  actions: {},
  getters: {},
}
