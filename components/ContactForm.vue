<template>
  <form
    class="contact-form"
    :action="formAction"
    method="get"
    novalidate
    @submit="handleSubmit"
  >
    <div class="form-grid">
      <label>
        <span>Name</span>
        <input v-model.trim="form.name" name="name" autocomplete="name" @blur="touch('name')">
        <small v-if="showError('name')" id="name-error">Please add your name.</small>
      </label>

      <label>
        <span>Email</span>
        <input
          v-model.trim="form.email"
          name="email"
          type="email"
          autocomplete="email"
          aria-describedby="email-error"
          @blur="touch('email')"
        >
        <small v-if="showError('email')" id="email-error">Please use a valid email.</small>
      </label>

      <label>
        <span>Company</span>
        <input v-model.trim="form.company" name="company" autocomplete="organization">
      </label>

      <label>
        <span>Event type</span>
        <select v-model="form.eventType" name="eventType">
          <option value="">I am still deciding</option>
          <option>Conference</option>
          <option>Leadership retreat</option>
          <option>Award night</option>
          <option>Product launch</option>
          <option>Team away day</option>
          <option>Networking evening</option>
        </select>
      </label>

      <label>
        <span>Approximate date</span>
        <input v-model.trim="form.date" name="date" type="text" placeholder="Month or date">
      </label>

      <label>
        <span>Location</span>
        <input v-model.trim="form.location" name="location" autocomplete="address-level2">
      </label>

      <label>
        <span>Guest count</span>
        <input v-model.trim="form.guestCount" name="guestCount" inputmode="numeric">
      </label>

      <label>
        <span>Budget range</span>
        <select v-model="form.budget" name="budget">
          <option value="">I am not sure yet</option>
          <option>Under 5k</option>
          <option>5k to 15k</option>
          <option>15k to 30k</option>
          <option>30k plus</option>
        </select>
      </label>
    </div>

    <label class="message-field">
      <span>Tell me what you need</span>
      <textarea
        v-model.trim="form.message"
        name="message"
        rows="6"
        aria-describedby="message-error"
        @blur="touch('message')"
      />
      <small v-if="showError('message')" id="message-error">Please share a few details about the event.</small>
    </label>

    <label class="consent-field">
      <input v-model="form.consent" name="consent" type="checkbox" @change="touch('consent')">
      <span>I am happy for Mary-Jo to use these details to reply to my enquiry.</span>
    </label>
    <small v-if="showError('consent')" class="consent-error">Please confirm before sending.</small>

    <button class="button button--primary" type="submit" :disabled="!isValid">
      <Send :size="18" aria-hidden="true" />
      Send enquiry
    </button>
  </form>
</template>

<script setup lang="ts">
import { Send } from 'lucide-vue-next'
import { computed, reactive } from 'vue'
import { getContactErrors } from '~/utils/contactValidation'

const props = defineProps<{
  formAction: string
}>()

const form = reactive({
  name: '',
  email: '',
  company: '',
  eventType: '',
  date: '',
  location: '',
  guestCount: '',
  budget: '',
  message: '',
  consent: false
})

const touched = reactive<Record<string, boolean>>({})
type RequiredField = 'name' | 'email' | 'message' | 'consent'

const errors = computed(() => getContactErrors(form))

const isValid = computed(() => !Object.values(errors.value).some(Boolean))

function touch(field: RequiredField) {
  touched[field] = true
}

function showError(field: RequiredField) {
  return touched[field] && errors.value[field]
}

function handleSubmit(event: Event) {
  Object.keys(errors.value).forEach((field) => {
    touched[field] = true
  })

  if (!isValid.value) {
    event.preventDefault()
  }
}

const formAction = computed(() => props.formAction || '/thank-you')
</script>
