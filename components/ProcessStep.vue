<template>
  <article class="process-step">
    <div class="process-step__top">
      <span class="process-step__icon" aria-hidden="true">
        <component :is="iconComponent" :size="21" stroke-width="1.8" />
      </span>
      <p>{{ step }}</p>
    </div>
    <p class="card-title">{{ title }}</p>
    <span>{{ description }}</span>
  </article>
</template>

<script setup lang="ts">
import { CheckCircle2, Ear, HeartHandshake, PencilRuler } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  step: string
  title: string
  description: string
  icon: 'ear' | 'pencil-ruler' | 'check-circle' | 'heart-handshake'
}>()

const icons = {
  ear: Ear,
  'pencil-ruler': PencilRuler,
  'check-circle': CheckCircle2,
  'heart-handshake': HeartHandshake
}

const iconComponent = computed(() => icons[props.icon])
</script>
