<template>
  <section id="faq" class="faq-accordion section-block" aria-labelledby="faq-title">
    <div class="section-shell faq-accordion__inner">
      <SectionHeader
        eyebrow="Good to know"
        title="A few honest answers"
        text="The questions I hear most often, answered the way I would answer them in person."
        align="center"
      />
      <ul>
        <li v-for="(faq, index) in faqs" :key="faq.question">
          <h3>
            <button
              :id="`faq-button-${index}`"
              type="button"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-panel-${index}`"
              @click="openIndex = openIndex === index ? null : index"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-accordion__icon" aria-hidden="true">
                <Minus v-if="openIndex === index" :size="17" />
                <Plus v-else :size="17" />
              </span>
            </button>
          </h3>
          <Transition name="faq">
            <div
              v-if="openIndex === index"
              :id="`faq-panel-${index}`"
              class="faq-accordion__panel"
              role="region"
              :aria-labelledby="`faq-button-${index}`"
            >
              {{ faq.answer }}
            </div>
          </Transition>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps<{
  faqs: readonly {
    question: string
    answer: string
  }[]
}>()

const openIndex = ref<number | null>(0)
</script>
