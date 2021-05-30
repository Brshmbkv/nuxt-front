const EXCEPTIONS = ['/', '/login', '/register']

export default function({store, redirect, route}) {
  if(!store.getters['isAuthenticated']) {
    if(EXCEPTIONS.includes(route.path)){
      return
    }
    return redirect({ name: 'login', query: {redirect: route.path}})
  }
}