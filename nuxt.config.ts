import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    rollupConfig: {
      plugins: [vue()],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      titleTemplate: '%s - %siteName',
      templateParams: {
        siteName: 'Loglybase',
      },
    },
  },

  runtimeConfig: {
    SSL_PREFIX: process.env.SSL_PREFIX,
    BASE_URL: process.env.BASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,

    public: {
      SSL_PREFIX: process.env.SSL_PREFIX,
      BASE_URL: process.env.BASE_URL,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/ui',
    '@prisma/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'motion-v/nuxt',
    '@vueuse/nuxt',
    'nuxt-security',
    '@nuxtjs/seo',
  ],

  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser':
          './node_modules/.prisma/client/index-browser.js',
      },
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ['composables', 'composables/*/*.ts', 'types/**/*.ts'],
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'stable',
        'beta',
        'alpha',
        'rc',
        'patch',
        'added',
        'changed',
        'removed',
        'deprecated',
        'fixed',
        'security',
      ],
    },
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
      },
      {
        name: 'Roboto',
        provider: 'google',
      },
      {
        name: 'Open Sans',
        provider: 'google',
      },
      {
        name: 'Lato',
        provider: 'google',
      },
      {
        name: 'Montserrat',
        provider: 'google',
      },
    ],
  },

  security: {
    corsHandler: {
      origin: '*',
    },
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'https:', 'data:', 'blob:'],
        'font-src': ["'self'", 'https:', 'data:'],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      },
      permissionsPolicy: {
        fullscreen: ['*'],
      },
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginEmbedderPolicy: 'unsafe-none',
      crossOriginOpenerPolicy: 'unsafe-none',
    },
    rateLimiter: false,
  },

  routeRules: {
    '/widget/**': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'frame-ancestors': ['*'],
          },
        },
      },
    },
  },
})
