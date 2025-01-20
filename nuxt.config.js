export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'middleWare',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
  ],

  // Plugins to run before rendering page
  plugins: [
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Axios module configuration
  axios: {
    baseURL: 'http://localhost:3001' // API endpoint
  },

  // Build Configuration
  build: {
  }
}
