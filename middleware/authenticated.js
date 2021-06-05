export default ({store, redirect}) => {
  if(store.getters['isAuthenticated']){
    console.log('auth middleware')
    redirect('student/courses')
  }
}