export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'soda-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    script: [
      {
        src: '/bootstrap/bootstrap.bundle.min.js',
        type: 'text/javascript'
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {src: '~/assets/bootstrap/soda.scss', lang: 'sass'},
  ],

  script: [
    {src: '/js/soda.js'},
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/auth.js',
    '~plugins/sodacs.js',
    '~plugins/router.js',
    '~plugins/toast.js',
    '~plugins/chart.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/router',
    '@nuxtjs/moment',
  ],

  routerModule: {
    /* module options */
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'nuxt-vuex-localstorage',
      {}
    ]
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['device','auth'],
  },

  env: {
    siteName: "管理系统",
    siteLogo: "logo.svg",
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    appID: 'soda008',
    appName: 'admin',
    appUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  rules: {
    "no-unused-vars": "off",
    "no-dupe-else-if": "off",

  },

  generate: {
    routes: [
      '/'
    ]
  },
}
