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
import { Crown, Presentation, Rocket, Trophy, Users, Wine } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  icon: 'presentation' | 'crown' | 'trophy' | 'rocket' | 'users' | 'wine'
}>()

const icons = {
  presentation: Presentation,
  crown: Crown,
  trophy: Trophy,
  rocket: Rocket,
  users: Users,
  wine: Wine
}

const iconComponent = computed(() => icons[props.icon])
</script>
