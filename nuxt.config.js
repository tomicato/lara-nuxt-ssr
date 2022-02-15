export default {
  //target: 'static',
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {hid: 'keywords', name: 'keywords', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/icon?family=Material+Icons"
      },
      {
        rel: "stylesheet",
        href:
          "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/assets/owl.carousel.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/assets/owl.theme.default.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/assets/owl.theme.default.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.5.1.slim.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/owl.carousel.js",
        type: "text/javascript"
      },

    ]
  },

  // Loading
  loading: { color: "#007bff" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.css'
  ],

  bootstrapVue : {
    // Установить плагин `IconsPlugin` (в дополнение к плагину` BootstrapVue`)
    icons : true
  },
  router: {
    middleware: ["clearValidationErrors"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/mixins/_user.js',
    './plugins/mixins/validation.js',
    './plugins/axios.js',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    //'@nuxtjs/auth',
    '@nuxtjs/auth-next',
    'vue-screen/nuxt',
  ],
  screen: {
    extend: 'bootstrap',
  },


  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: '/api',
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: "meta.token"
          },
          user: {
            url: '/user',
            method: 'get',
            property: false
          },
          logout: {
            url: '/logout',
            method: 'post',
          },
          register: {
            url: '/register',
            method: 'post',
          }
        },
        token: {
          property: "meta.token",
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "https://com-helps.online",
    //baseURL: "http://lara-nuxt-ssr"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

  // Server config
  server: {
    //port: 3000
    port: process.env.PORT || 3000

    //port: 8000, // default: 3000
   // host: '0.0.0.0' // default: localhost
  }
}
