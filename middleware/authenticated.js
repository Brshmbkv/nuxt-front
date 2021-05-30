export default ({store, redirect}) => {
  if(store.getters['isAuthenticated']){
    redirect('student/courses')
  }
}