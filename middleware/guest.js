const EXCEPTIONS = ['/', '/login', '/register']

export default function({store, redirect, route}) {
  console.log('guest middleware')
  if(!store.getters['isAuthenticated']) {
    if(EXCEPTIONS.includes(route.path)){
      return
    }
    return redirect({ name: 'login', query: {redirect: route.path}})
  }
}