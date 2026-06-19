<template>
  <header class="section-header">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="text" class="section-header__text">{{ text }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  text?: string
}>()
</script>
