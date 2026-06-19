<template>
  <div class="flourish-divider" :class="className" aria-hidden="true">
    <span />
    <BrandSparkle />
    <span />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
