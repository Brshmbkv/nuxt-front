export default {
  getters: {
    isAuthenticated(state){
      return state.auth.loggedIn;
    },
    user(state){
      return state.auth.user;
    },
    userFullname(state, getters){
      const name = getters.user.first_name ?? ''
      const surname = getters.user.last_name ?? ''
      return name + " " + surname
    }
  }
}