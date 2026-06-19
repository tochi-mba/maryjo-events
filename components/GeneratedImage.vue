<template>
  <figure class="generated-image" :class="tone" :style="{ backgroundImage: `url(${src})` }" role="img" :aria-label="alt" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    tone?: 'light' | 'dark'
  }>(),
  {
    tone: 'light'
  }
)
</script>
