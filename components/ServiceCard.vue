<template>
  <article class="service-card">
    <div class="service-card__icon" aria-hidden="true">
      <component :is="iconComponent" :size="22" stroke-width="1.8" />
    </div>
    <p class="card-title">{{ title }}</p>
    <p>{{ description }}</p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { serviceIcons, type ServiceIcon } from '~/utils/serviceIcons'

const props = defineProps<{
  title: string
  description: string
  icon: ServiceIcon
}>()

const iconComponent = computed(() => serviceIcons[props.icon])
</script>
