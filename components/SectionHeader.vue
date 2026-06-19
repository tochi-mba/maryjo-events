<template>
  <header class="section-header" :class="[{ 'section-header--center': align === 'center', 'section-header--dark': onDark }, className]">
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
  align?: 'left' | 'center'
  onDark?: boolean
  className?: string
}>()
</script>
