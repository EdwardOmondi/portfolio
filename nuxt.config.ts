// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://edwardomondi.github.io',
    name: 'Edward Omondi - Software Engineer',
    description: 'Portfolio of Edward Omondi, a full-stack Software Engineer based in Nairobi, Kenya, specialising in Java/Spring and modern web frameworks like Angular and Nuxt.',
    defaultLocale: 'en'
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/']
      }
    ]
  }
})
