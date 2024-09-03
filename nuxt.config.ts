// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ui: {
    icons: ['heroicons', 'material-symbols']
  },
  imports: {
    dirs: ['stores']
  },
  css: ['~/assets/style/global.css'],
  devtools: { enabled: true },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: [
    'vue-yandex-maps/nuxt',
    'nuxt-windicss',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    "@nuxt/ui"
  ],
  yandexMaps: {
    apikey: '00efa97b-583d-4611-aa38-6b74d510bc7e',
  },
  app: {
    baseURL: '/eco-filter/',
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/cinema-park/favicon.ico' }],
      title: 'Hobiotech'
    }
  },
  colorMode: {
    preference: 'light'
  }
})