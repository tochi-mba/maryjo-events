<template>
  <form
    class="contact-form"
    :action="formAction"
    method="get"
    novalidate
    @submit="handleSubmit"
  >
    <div class="form-grid">
      <div class="form-field" :class="{ 'is-invalid': showError('name') }">
        <div class="field-label">
          <label for="name">Name</label>
          <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.name">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="name-guidance" class="sr-only">{{ fieldMessages.name }}</span>
        <input
          id="name"
          v-model.trim="form.name"
          name="name"
          autocomplete="name"
          :aria-invalid="showError('name')"
          aria-describedby="name-guidance form-errors"
          @blur="touch('name')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('email') }">
        <div class="field-label">
          <label for="email">Email</label>
          <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.email">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="email-guidance" class="sr-only">{{ fieldMessages.email }}</span>
        <input
          id="email"
          v-model.trim="form.email"
          name="email"
          type="email"
          autocomplete="email"
          :aria-invalid="showError('email')"
          aria-describedby="email-guidance form-errors"
          @blur="touch('email')"
        >
      </div>

      <div class="form-field">
        <div class="field-label">
          <label for="company">Company</label>
          <span class="field-optional">Optional</span>
        </div>
        <input id="company" v-model.trim="form.company" name="company" autocomplete="organization">
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('eventType') }">
        <div class="field-label">
          <label for="eventType">Event type</label>
          <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.eventType">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="eventType-guidance" class="sr-only">{{ fieldMessages.eventType }}</span>
        <select
          id="eventType"
          v-model="form.eventType"
          name="eventType"
          :aria-invalid="showError('eventType')"
          aria-describedby="eventType-guidance form-errors"
          @blur="touch('eventType')"
        >
          <option value="">Choose the closest fit</option>
          <option>Conference</option>
          <option>Leadership retreat</option>
          <option>Award night</option>
          <option>Product launch</option>
          <option>Team away day</option>
          <option>Networking evening</option>
        </select>
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('date') }">
        <div class="field-label">
          <label for="date">Approximate date</label>
          <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.date">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="date-guidance" class="sr-only">{{ fieldMessages.date }}</span>
        <input
          id="date"
          v-model="form.date"
          name="date"
          type="date"
          :min="today"
          :aria-invalid="showError('date')"
          aria-describedby="date-guidance form-errors"
          @blur="touch('date')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('location') }">
        <div class="field-label">
          <label for="location">Location</label>
          <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.location">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="location-guidance" class="sr-only">{{ fieldMessages.location }}</span>
        <input
          id="location"
          v-model.trim="form.location"
          name="location"
          autocomplete="address-level2"
          :aria-invalid="showError('location')"
          aria-describedby="location-guidance form-errors"
          @blur="touch('location')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('guestCount') }">
        <div class="field-label">
          <label for="guestCount">Guest count</label>
          <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.guestCount">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="guestCount-guidance" class="sr-only">{{ fieldMessages.guestCount }}</span>
        <input
          id="guestCount"
          v-model.trim="form.guestCount"
          name="guestCount"
          type="number"
          min="1"
          step="1"
          inputmode="numeric"
          :aria-invalid="showError('guestCount')"
          aria-describedby="guestCount-guidance form-errors"
          @blur="touch('guestCount')"
        >
      </div>

      <div class="form-field">
        <div class="field-label">
          <label for="budget">Budget range</label>
          <span class="field-optional">Optional</span>
        </div>
        <select id="budget" v-model="form.budget" name="budget">
          <option value="">I am not sure yet</option>
          <option>Under 5k</option>
          <option>5k to 15k</option>
          <option>15k to 30k</option>
          <option>30k plus</option>
        </select>
      </div>
    </div>

    <div class="form-field message-field" :class="{ 'is-invalid': showError('message') }">
      <div class="field-label">
        <label for="message">Tell me what you need</label>
        <button class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.message">
          <Info :size="15" aria-hidden="true" />
        </button>
      </div>
      <span id="message-guidance" class="sr-only">{{ fieldMessages.message }}</span>
      <textarea
        id="message"
        v-model.trim="form.message"
        name="message"
        rows="6"
        maxlength="800"
        :aria-invalid="showError('message')"
        aria-describedby="message-guidance message-count form-errors"
        @blur="touch('message')"
      />
      <p id="message-count" class="character-count" aria-live="polite">
        {{ messageLength }}/800 characters
      </p>
    </div>

    <label class="consent-field" :class="{ 'is-invalid': showError('consent') }">
      <input
        v-model="form.consent"
        name="consent"
        type="checkbox"
        :aria-invalid="showError('consent')"
        aria-describedby="form-errors"
        @change="touch('consent')"
      >
      <span>I am happy for Mary-Jo to use these details to reply to my enquiry.</span>
    </label>

    <div
      id="form-errors"
      class="form-errors"
      :class="{ 'form-errors--visible': visibleErrors.length }"
      role="status"
      aria-live="polite"
    >
      <p>{{ visibleErrors.length ? 'A few details still need attention:' : 'All required details are ready.' }}</p>
      <ul v-if="visibleErrors.length">
        <li v-for="error in visibleErrors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <button class="button button--primary" type="submit" :disabled="!isValid">
      <Send :size="18" aria-hidden="true" />
      Send enquiry
    </button>
  </form>
</template>

<script setup lang="ts">
import { Info, Send } from 'lucide-vue-next'
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
type RequiredField = 'name' | 'email' | 'eventType' | 'date' | 'location' | 'guestCount' | 'message' | 'consent'

const fieldMessages: Record<RequiredField, string> = {
  name: 'Add the name Mary-Jo should reply to.',
  email: 'Use an email address Mary-Jo can reply to.',
  eventType: 'Choose the option that is closest to your event.',
  date: 'Pick the likely event date. It can be approximate for now.',
  location: 'Add the town, city, venue, or region if you know it.',
  guestCount: 'Use numbers only, even if it is an estimate.',
  message: 'Share at least 20 characters about what you need. You have up to 800.',
  consent: 'Confirm that Mary-Jo can use these details to reply.'
}

const errors = computed(() => getContactErrors(form))

const isValid = computed(() => !Object.values(errors.value).some(Boolean))
const messageLength = computed(() => form.message.trim().length)
const today = new Date().toISOString().slice(0, 10)
const visibleErrors = computed(() =>
  (Object.keys(fieldMessages) as RequiredField[])
    .filter((field) => touched[field] && errors.value[field])
    .map((field) => fieldMessages[field])
)

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
