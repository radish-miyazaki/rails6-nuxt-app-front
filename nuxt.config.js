export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/sass/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    'plugins/auth',
    'plugins/axios',
    'plugins/myInject',
    'plugins/nuxtClientInit'
  ],

  axios: {
    // クロスサイトリクエスト時にCookieを使用することを許可する
    credentials: true
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    // 開発環境でcustomVariablesを有効にするフラグ
    treeShake: true,
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      themes: {
        light: {
          primary:    '4080BE',
          info:       '4FC1E9',
          success:    '44D69E',
          warning:    'FEB65E',
          error:      'FB8678',
          background: 'f6f6f4',
          myblue:     '1867C0'
        }
      }
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],

  i18n: {
    // アプリがサポートする言語
    locales: ['ja', 'en'],
    // デフォルトの言語
    defaultLocale: 'ja',
    vueI18n: {
      // defaultLocal(ja.json)にkeyがない場合に参照される（フィードバック）言語
      fallbackLocale: true,
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json')
      },
      // 翻訳が失敗した場合の警告メッセージを出力しない => true
      // silentFallbackWarn: true
    },
    strategy: 'no_prefix'
  },

  // public ENV
  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    cryptoKey: process.env.CRYPTO_KEY
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
