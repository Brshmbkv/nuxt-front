const roles = ['пользователь', 'преподаватель']
export default ({store, redirect, error, route}) => {
  if(!store.getters['isAuthenticated']) {
    return
  }
  const user = store.getters['user']
  const pathNamespace = route.path.slice(1).split('/')[0]
  if(pathNamespace === 'student' && user.role_name.toLowerCase() === roles[0]){
    return
  }
  else if(pathNamespace === 'teacher' && user.role_name.toLowerCase() === roles[1]){
    return
  }
  else {
    error({statusCode: 502, message: "Don't have access to this route!"})
  }
}