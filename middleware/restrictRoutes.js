import routes from '@/middleware/publicRoutes'
const roles = ['пользователь', 'преподаватель']
export default ({store, error, route}) => {
  console.log('restrict middleware')
  if(!store.getters['isAuthenticated']) {
    return
  }
  if(routes.includes(route.path)){
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
    error({statusCode: 502, message: "You don't have access to this route!"})
  }
}