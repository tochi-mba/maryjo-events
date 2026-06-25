import { siteConfig } from './data/site'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? siteConfig.meta.url
const socialPreviewUrl = `${siteUrl.replace(/\/$/, '')}/images/social-preview.png`

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
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
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
        { property: 'og:image', content: socialPreviewUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteConfig.meta.title },
        { name: 'twitter:description', content: siteConfig.meta.description },
        { name: 'twitter:image', content: socialPreviewUrl }
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/favicon-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl,
      formAction: process.env.NUXT_PUBLIC_FORM_ENDPOINT ?? siteConfig.contact.formAction,
      calendarUrl: siteConfig.contact.calendarUrl,
      contactEmail: siteConfig.contact.email
    }
  }
})
