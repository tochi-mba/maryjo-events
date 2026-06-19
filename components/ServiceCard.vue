<template>
  <article class="service-card">
    <div class="service-card__icon" aria-hidden="true">
      <component :is="iconComponent" :size="22" stroke-width="1.8" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </article>
</template>

<script setup lang="ts">
import { CalendarDays, Handshake, Lightbulb, MapPinned, Presentation, Trophy } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  text: string
  icon: 'conference' | 'summit' | 'awards' | 'launch' | 'away-day' | 'networking'
}>()

const icons = {
  conference: Presentation,
  summit: MapPinned,
  awards: Trophy,
  launch: Lightbulb,
  'away-day': CalendarDays,
  networking: Handshake
}

const iconComponent = computed(() => icons[props.icon])
</script>
