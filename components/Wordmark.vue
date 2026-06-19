<template>
  <NuxtLink v-if="link" class="wordmark" :class="{ 'wordmark--dark': onDark }" to="/" aria-label="Mary-Jo Corporate Events home">
    <span class="wordmark__mary">Mary</span><span class="wordmark__jo">-Jo</span>
  </NuxtLink>
  <span v-else class="wordmark" :class="{ 'wordmark--dark': onDark }" aria-label="Mary-Jo">
    <span class="wordmark__mary">Mary</span><span class="wordmark__jo">-Jo</span>
  </span>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BrandWordmark'
})

withDefaults(
  defineProps<{
    link?: boolean
    onDark?: boolean
  }>(),
  {
    link: false,
    onDark: false
  }
)
</script>
