<template>
  <svg class="sparkle" :class="className" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BrandSparkle'
})

defineProps<{
  className?: string
}>()
</script>
