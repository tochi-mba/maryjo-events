<template>
  <NuxtLink v-if="link" class="wordmark" to="/" aria-label="Mary-Jo Corporate Events home">
    <span class="wordmark__mary">Mary</span><span class="wordmark__jo">-Jo</span>
  </NuxtLink>
  <span v-else class="wordmark" aria-label="Mary-Jo">
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
  }>(),
  {
    link: false
  }
)
</script>
