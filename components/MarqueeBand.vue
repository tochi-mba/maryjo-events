<template>
  <section class="marquee-band" aria-label="Mary-Jo planning values">
    <div class="marquee-band__track">
      <span v-for="(item, index) in loopedItems" :key="`${item}-${index}`">
        {{ item }}
        <BrandSparkle />
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: readonly string[]
}>()

const loopedItems = [...props.items, ...props.items]
</script>
