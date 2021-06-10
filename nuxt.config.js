export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'know.iitu.edu.kz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/validation.js", ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    "@nuxtjs/auth-next"
  ],

  router: {
    middleware: ["guest", "restrictRoutes"]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    //baseURL: "https://know.iitu.edu.kz/api"
    baseURL: "http://glacial-everglades-84858.herokuapp.com/api"
  },

  auth: {
    scopeKey: 'user.role_name',
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: "/",
        endpoints: {
          login: { url: "login", method: "post" },
          user: { url: "user", method: "get" },
          logout: { url: "logout", method: "post" },
          refresh: { url: "refresh", method: "get"}
        },
        token: {
          property: "token",
          maxAge: 60
        },
        refreshToken: {
          maxAge: 20160 * 60,
          property: 'token',
          data: 'token'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate"]
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  }
}
