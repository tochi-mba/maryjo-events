<template>
  <article class="process-step">
    <p>{{ kicker }}</p>
    <h3>{{ title }}</h3>
    <span>{{ text }}</span>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  kicker: string
  title: string
  text: string
}>()
</script>
