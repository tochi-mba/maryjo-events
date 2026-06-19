<template>
  <component
    :is="as"
    ref="root"
    class="reveal"
    :class="[{ 'is-visible': isVisible }, className]"
    :data-reveal-ready="isReady ? 'true' : 'false'"
    :style="{ '--reveal-delay': `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'RevealBlock'
})

const props = withDefaults(
  defineProps<{
    as?: 'div' | 'section' | 'article' | 'li' | 'header'
    className?: string
    delay?: number
  }>(),
  {
    as: 'div',
    className: '',
    delay: 0
  }
)

const root = ref<HTMLElement | null>(null)
const isReady = ref(false)
const isVisible = ref(true)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }

  if (!root.value) return

  const bounds = root.value.getBoundingClientRect()
  const startsInView = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0
  isVisible.value = startsInView

  nextTick(() => {
    window.requestAnimationFrame(() => {
      isReady.value = true
    })
  })

  if (startsInView) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: '0px 0px -80px' }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>
