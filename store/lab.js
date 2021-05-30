export default {
  state() {
    return {
      labPath: ''
    }
  },
  mutations: {
    SET_PATH(state, payload){
      state.labPath = payload
    }
  },
  actions: {
    setPath({commit}, payload) {
      commit('SET_PATH', payload)
    }
  },
  getters: {
    path(state){
      return state.labPath
    }
  }
}