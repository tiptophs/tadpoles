// 全局业务store, 不同全局业务之间store用不同文件区分 example: [account.js, team.js] ...
export default {
  namespaced: true,
  state: () => ({
    userName: '',
    userId: '',
    info: {},
  }),
  mutations: {
    /**
     *@param {Object} state 本空间下的state
     *@param {Object} payload 传递的参数对象
     */
    setUserNameIds(state, payload) {
      state.userName = payload.name
      state.userId = payload.uid
    },
    /**
     *@param {Object} state 本空间下的state
     *@param {Object} payload 传递的参数对象
     */
    getUserInfo(state, payload) {
      if (payload.uid) {
        state.info = {
          name: '测试',
          age: '20',
          sex: '男',
        }
      }
    },
  },
  actions: {
    // 按需加载结构出需要的数据
    axiosSetUameIds({ commit, state }) {
      commit('getUserInfo', { uid: state.userId })
      setTimeout(() => {}, 300)
    },
  },
  getters: {
    getUserNameIds(state) {
      return `${state.userName}--${state.userName}`
    },
  },
}
