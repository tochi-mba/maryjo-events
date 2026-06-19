<template>
  <header class="premium-header" :class="{ 'is-scrolled': isScrolled, 'is-open': isOpen }">
    <div class="premium-header__inner">
      <Wordmark link />
      <nav aria-label="Main navigation" class="premium-header__nav">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
      <a class="premium-header__cta" href="#contact">
        Start a conversation
        <ArrowUpRight :size="16" aria-hidden="true" />
      </a>
      <button
        class="premium-header__toggle"
        type="button"
        aria-controls="mobile-nav"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <Menu v-if="!isOpen" :size="22" aria-hidden="true" />
        <X v-else :size="22" aria-hidden="true" />
        <span>{{ isOpen ? 'Close menu' : 'Open menu' }}</span>
      </button>
    </div>

    <Transition name="mobile-nav">
      <nav v-if="isOpen" id="mobile-nav" class="premium-header__mobile" aria-label="Mobile navigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href" @click="isOpen = false">{{ item.label }}</a>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  navigation: readonly {
    label: string
    href: string
  }[]
}>()

const isOpen = ref(false)
const isScrolled = ref(false)

function updateScrollState() {
  isScrolled.value = window.scrollY > 24
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
