import { siteConfig } from './data/site'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true
  },
  nitro: {
    prerender: {
      routes: ['/', '/privacy', '/thank-you']
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      title: siteConfig.meta.title,
      meta: [
        { name: 'description', content: siteConfig.meta.description },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#3d1a2e' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: siteConfig.meta.title },
        { property: 'og:description', content: siteConfig.meta.description },
        { property: 'og:image', content: '/images/social-preview.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteConfig.meta.title },
        { name: 'twitter:description', content: siteConfig.meta.description },
        { name: 'twitter:image', content: '/images/social-preview.png' }
      ],
      link: [{ rel: 'canonical', href: siteConfig.meta.url }]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: siteConfig.meta.url,
      formAction: siteConfig.contact.formAction,
      calendarUrl: siteConfig.contact.calendarUrl,
      contactEmail: siteConfig.contact.email
    }
  }
})
