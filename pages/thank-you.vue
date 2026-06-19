<template>
  <main class="simple-page">
    <Wordmark link />
    <p class="eyebrow">Thank you</p>
    <h1>I have your note.</h1>
    <p>
      Thanks for sharing the first details. I will read it properly and come back with thoughtful next questions.
    </p>
    <NuxtLink class="button button--primary" to="/">
      <ArrowLeft :size="18" aria-hidden="true" />
      Back to the site
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { siteConfig } from '~/data/site'

useSeoMeta({
  title: `Thank you | ${siteConfig.meta.title}`,
  description: 'Thanks for contacting Mary-Jo Corporate Events.'
})
</script>
