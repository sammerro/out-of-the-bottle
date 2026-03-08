// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    vue: {
      template: {
        transformAssetUrls: false,
      },
    },
  },
  nitro: {
    preset: 'static'
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
});