<template>
  <div>
    <header class="site-header">
      <Wordmark link />
      <nav aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
      <a class="header-cta" href="#contact">Enquire</a>
    </header>

    <main>
      <section class="hero section-shell" aria-labelledby="hero-title">
        <div class="hero__copy">
          <p class="eyebrow">{{ brand.label }}</p>
          <h1 id="hero-title">{{ brand.tagline }}</h1>
          <p class="hero__lead">
            Fresh energy. Genuine care. A whole lot of enthusiasm for getting it right.
          </p>
          <p>
            I am Mary-Jo, a corporate event planner who genuinely loves the details other people overlook.
          </p>
          <div class="hero__actions">
            <a class="button button--primary" href="#contact">
              <MessageCircle :size="18" aria-hidden="true" />
              Tell me about your event
            </a>
            <a class="button button--ghost" href="#approach">
              <ArrowDown :size="18" aria-hidden="true" />
              See my approach
            </a>
          </div>
        </div>
        <GeneratedImage
          class="hero__image"
          src="/images/hero-event-planning.png"
          alt="Corporate event planning table with notebooks, stationery, flowers, and a venue being prepared"
          tone="dark"
        />
      </section>

      <section id="services" class="section-shell section-block" aria-labelledby="services-title">
        <SectionHeader
          eyebrow="Services"
          title="Events with the details looked after"
          text="Whether it is your first big conference or a company away day, I will make sure every detail is taken care of."
        />
        <div class="service-grid">
          <ServiceCard
            v-for="(service, index) in services"
            :key="service.title"
            :title="service.title"
            :text="service.text"
            :icon="serviceIcons[index]"
          />
        </div>
      </section>

      <section id="approach" class="approach section-shell section-block" aria-labelledby="approach-title">
        <div>
          <SectionHeader
            eyebrow="Approach"
            title="Thoughtful from the first question"
            text="No pretending to be bigger than I am. I listen carefully, plan clearly, and stay honest about what needs doing."
          />
          <div class="process-grid">
            <ProcessStep v-for="step in processSteps" :key="step.kicker" v-bind="step" />
          </div>
        </div>
        <GeneratedImage
          src="/images/process-details.png"
          alt="Event planning papers, checklist, colour swatches, and tea arranged on a bright desk"
        />
      </section>

      <section id="about" class="about-band" aria-labelledby="about-title">
        <div class="section-shell about-band__inner">
          <p class="eyebrow">About Mary-Jo</p>
          <h2 id="about-title">New to the industry, not new to hard work.</h2>
          <p>
            I am building Mary-Jo Corporate Events with curiosity, care, and the kind of attention that comes from wanting every brief to matter. I will not fake years I do not have. I will ask better questions, keep learning, and put real thought into every event I take on.
          </p>
        </div>
      </section>

      <section class="section-shell section-block fit-grid" aria-labelledby="fit-title">
        <div>
          <SectionHeader
            eyebrow="Event fit"
            title="For businesses of all sizes"
            text="If the event matters to your team, it is worth planning properly."
          />
          <ul aria-label="Event types" class="event-list">
            <li v-for="eventType in eventTypes" :key="eventType">
              <Check :size="18" aria-hidden="true" />
              {{ eventType }}
            </li>
          </ul>
        </div>
        <aside class="proof-panel" aria-label="What clients can expect">
          <h3>What you can expect</h3>
          <ul>
            <li v-for="point in proofPoints" :key="point">{{ point }}</li>
          </ul>
        </aside>
      </section>

      <section class="faq-band" aria-labelledby="faq-title">
        <div class="section-shell section-block">
          <SectionHeader eyebrow="Questions" title="A few things worth asking early" />
          <div id="faq-title" class="faq-grid">
            <article v-for="faq in faqs" :key="faq.question">
              <h3>{{ faq.question }}</h3>
              <p>{{ faq.answer }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="contact section-shell section-block" aria-labelledby="contact-title">
        <div class="contact__intro">
          <SectionHeader
            eyebrow="Contact"
            title="Got an event in mind?"
            text="I would love to hear about it. Share what you know so far, and I will come back with thoughtful next questions."
          />
          <div class="contact__links">
            <a :href="`mailto:${siteConfig.contact.email}`">
              <Mail :size="18" aria-hidden="true" />
              {{ siteConfig.contact.email }}
            </a>
            <span>
              <MapPin :size="18" aria-hidden="true" />
              {{ brand.serviceArea }}
            </span>
          </div>
        </div>
        <ContactForm :form-action="siteConfig.contact.formAction" />
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <Wordmark />
        <p>{{ brand.label }} / {{ brand.serviceArea }} / Brand Guidelines</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        <NuxtLink to="/privacy">Privacy</NuxtLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, Check, Mail, MapPin, MessageCircle } from 'lucide-vue-next'
import { brand, eventTypes, faqs, navigation, processSteps, proofPoints, services, siteConfig } from '~/data/site'

useSeoMeta({
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  ogTitle: siteConfig.meta.title,
  ogDescription: siteConfig.meta.description,
  ogImage: '/images/social-preview.png',
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
        url: siteConfig.meta.url,
        email: siteConfig.contact.email,
        image: `${siteConfig.meta.url}/images/social-preview.png`,
        serviceType: services.map((service) => service.title)
      })
    }
  ]
})

const serviceIcons = ['conference', 'summit', 'awards', 'launch', 'away-day', 'networking'] as const
</script>
