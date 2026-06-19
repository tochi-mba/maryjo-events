<template>
  <main class="simple-page simple-page--wide">
    <Wordmark link />
    <p class="eyebrow">Privacy</p>
    <h1>Plain-language privacy note</h1>
    <p>
      When you send an enquiry, Mary-Jo Corporate Events uses the details you provide only to understand your event and reply to you.
    </p>
    <p>
      The form is prepared for a third-party provider such as Google Forms, Formspree, Netlify Forms, or a calendar tool. The final provider should be connected before launch, and its privacy handling should be checked at that point.
    </p>
    <p>
      Do not include sensitive information in the first message. A clearer project brief can be shared later if the event is a fit.
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
  title: `Privacy | ${siteConfig.meta.title}`,
  description: 'Privacy note for Mary-Jo Corporate Events enquiries.'
})
</script>
