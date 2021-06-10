//This middleware give responsibility to guest users to go public routes
import routes from '@/middleware/publicRoutes'

export default function({store, redirect, route}) {
  if(!store.getters['isAuthenticated']) {
    if(routes.includes(route.path)){
      return
    }
    return redirect({ name: 'login', query: {redirect: route.path}})
  }
}