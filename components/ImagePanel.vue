<template>
  <figure class="image-panel" :class="[`image-panel--${variant}`, className]">
    <img :src="src" :alt="alt" :loading="priority ? 'eager' : 'lazy'">
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
    priority?: boolean
    variant?: 'portrait' | 'landscape' | 'square' | 'hero'
    className?: string
  }>(),
  {
    caption: '',
    priority: false,
    variant: 'landscape',
    className: ''
  }
)
</script>
