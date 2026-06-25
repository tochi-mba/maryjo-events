<template>
  <div id="top">
    <SiteHeader :navigation="navigation" />

    <main>
      <section class="hero section-shell" aria-labelledby="hero-title">
        <Reveal class-name="hero__copy">
          <h1 id="hero-title">{{ brand.tagline }}</h1>
          <p class="hero__lead">
            I am Mary-Jo. I put real thought into every event I take on, from the first conversation to the final goodbye.
          </p>
          <div class="hero__actions">
            <a class="button button--primary" href="#contact">
              Tell me about your event
              <ArrowRight :size="18" aria-hidden="true" />
            </a>
            <a class="button button--ghost" href="#event-fit">
              See what I plan
              <ArrowDown :size="18" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal :delay="120" class-name="hero__visual">
          <ImagePanel
            :src="publicAsset('/images/hero-premium-event.png')"
            alt="Warm corporate event planning scene with stationery, flowers, venue details, and thoughtful planning materials"
            caption="Every detail, considered"
            variant="hero"
            priority
          />
        </Reveal>
        <a class="hero__scroll" href="#event-fit" aria-label="Scroll to services">
          <span />
        </a>
      </section>

      <section v-if="homepageSections.services" id="services" class="section-shell section-block" aria-labelledby="services-title">
        <Reveal as="header">
          <SectionHeader
            eyebrow="What I plan"
            title="Events I would love to help with"
          />
        </Reveal>
        <div class="service-grid">
          <Reveal
            v-for="(service, index) in services"
            :key="service.title"
            :delay="index * 70"
          >
            <ServiceCard v-bind="service" />
          </Reveal>
        </div>
      </section>

      <MarqueeBand :items="marqueeItems" />

      <section v-if="homepageSections.approach" id="approach" class="approach section-shell section-block" aria-labelledby="approach-title">
        <Reveal>
          <SectionHeader
            eyebrow="How I work"
            title="A calm, honest way of planning"
            text="No jargon, no pressure. Just a clear process that keeps us both looking at the same picture."
          />
        </Reveal>
        <div class="process-grid">
          <Reveal
            v-for="(step, index) in processSteps"
            :key="step.step"
            :delay="index * 80"
          >
            <ProcessStep v-bind="step" />
          </Reveal>
        </div>
      </section>

      <section v-if="homepageSections.about" id="about" class="about section-shell section-block" aria-labelledby="about-title">
        <Reveal class-name="about__image">
          <ImagePanel
            :src="publicAsset('/images/process-details.png')"
            alt="Event planning papers, checklist, colour swatches, and tea arranged on a bright desk"
            variant="portrait"
          />
        </Reveal>
        <Reveal :delay="100" class-name="about__copy">
          <SectionHeader eyebrow="About Mary-Jo" title="Hello, I am Mary-Jo" />
          <p>
            I am a corporate event planner who genuinely loves the details other people overlook: the run of the day, the way guests are welcomed, the moment something could go wrong and quietly does not.
          </p>
          <p>
            I am honest about where I am in my journey, and I think that is exactly why I bring so much care and curiosity to every brief.
          </p>
          <figure class="quote-card">
            <Quote :size="26" aria-hidden="true" />
            <blockquote>Tell me what you need, and I will figure out how to make it happen.</blockquote>
            <figcaption>Mary-Josephine Murphy, Founder</figcaption>
          </figure>
        </Reveal>
      </section>

      <section id="event-fit" class="event-fit section-block" aria-labelledby="event-fit-title">
        <div class="section-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Services"
              title="For businesses of all sizes"
              text="If you recognise your event below, we should talk."
              on-dark
            />
          </Reveal>
          <div class="event-grid">
            <Reveal
              v-for="(service, index) in services"
              :key="service.title"
              as="article"
              :delay="index * 65"
              class-name="event-card"
            >
              <span class="event-card__icon" aria-hidden="true">
                <component :is="serviceIcon(service.icon)" :size="20" stroke-width="1.8" />
              </span>
              <p class="card-title">{{ service.title }}</p>
              <p>{{ service.description }}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section v-if="homepageSections.proof" id="proof" class="section-shell section-block proof" aria-labelledby="proof-title">
        <Reveal>
          <SectionHeader
            eyebrow="What to expect"
            title="What working with me looks like"
            text="No fake reviews or borrowed logos here. Just a clear, honest sense of what you will actually get."
          />
        </Reveal>
        <div class="proof-grid">
          <Reveal
            v-for="(point, index) in proofPoints"
            :key="point.title"
            as="article"
            :delay="index * 80"
            class-name="proof-card"
          >
            <span class="proof-card__icon" aria-hidden="true">
              <component :is="proofIcon(point.icon)" :size="21" stroke-width="1.8" />
            </span>
            <div>
              <p class="card-title">{{ point.title }}</p>
              <p>{{ point.description }}</p>
            </div>
          </Reveal>
        </div>
        <FlourishDivider class-name="proof__flourish" />
        <p class="proof__note">
          And honestly? You get a planner who cares, because every brief still feels exciting to me.
        </p>
      </section>

      <section id="contact" class="contact section-shell section-block" aria-labelledby="contact-title">
        <Reveal class-name="contact__intro">
          <SectionHeader
            eyebrow="Get in touch"
            title="Got an event in mind?"
            text="I would love to hear about it. Tell me a little below and I will come back to you personally."
          />
          <div class="contact__email-card">
            <p>Prefer to email?</p>
            <a :href="`mailto:${siteConfig.contact.email}`">
              <Mail :size="18" aria-hidden="true" />
              {{ siteConfig.contact.email }}
            </a>
          </div>
          <Wordmark class="contact__wordmark" />
        </Reveal>
        <Reveal :delay="120">
          <ContactForm :form-action="formAction" :success-path="thankYouPath" />
        </Reveal>
      </section>
    </main>

    <footer class="site-footer">
      <div class="section-shell site-footer__inner">
        <div>
          <Wordmark on-dark />
          <p>Freelance corporate event planning, thoughtfully done. I would love to hear what you have in mind.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a v-for="item in footerNavigation" :key="item.href" :href="item.href">{{ item.label }}</a>
          <NuxtLink to="/privacy">Privacy</NuxtLink>
        </nav>
      </div>
      <div class="section-shell site-footer__bottom">
        <p>&copy; {{ year }} {{ brand.name }}. Founded by {{ brand.founder }}.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDown,
  ArrowRight,
  ClipboardList,
  FileText,
  Mail,
  MessageCircle,
  Quote,
  Sparkles
} from 'lucide-vue-next'
import { computed } from 'vue'
import {
  brand,
  homepageSections,
  marqueeItems,
  navigation,
  processSteps,
  proofPoints,
  services,
  siteConfig
} from '~/data/site'
import { serviceIcons, type ServiceIcon } from '~/utils/serviceIcons'

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.app.baseURL
const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, '')
const socialPreviewImage = `${siteUrl}/images/social-preview.png`
const year = new Date().getFullYear()

const publicAsset = (path: string) => `${baseUrl.replace(/\/$/, '')}${path}`
const routePath = (path: string) => {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

const formAction = computed(() => routePath(String(runtimeConfig.public.formAction || siteConfig.contact.formAction)))
const thankYouPath = computed(() => routePath('/thank-you'))
const footerNavigation = [
  { label: 'Services overview', href: '#event-fit' },
  { label: 'Contact Mary-Jo', href: '#contact' }
]

const proofIcons = {
  'file-text': FileText,
  'clipboard-list': ClipboardList,
  sparkles: Sparkles,
  'message-circle': MessageCircle
}

function proofIcon(icon: keyof typeof proofIcons) {
  return proofIcons[icon]
}

function serviceIcon(icon: ServiceIcon) {
  return serviceIcons[icon]
}

useSeoMeta({
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  ogTitle: siteConfig.meta.title,
  ogDescription: siteConfig.meta.description,
  ogImage: socialPreviewImage,
  twitterCard: 'summary_large_image'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: brand.name,
        founder: brand.founder,
        slogan: brand.tagline,
        areaServed: brand.serviceArea,
        url: siteUrl,
        email: siteConfig.contact.email,
        image: socialPreviewImage,
        serviceType: services.map((service) => service.title)
      })
    }
  ]
})
</script>
