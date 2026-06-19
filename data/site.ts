export const brand = {
  name: 'Mary-Jo Corporate Events',
  shortName: 'Mary-Jo',
  label: 'CORPORATE EVENTS',
  founder: 'Mary-Josephine Murphy',
  tagline: 'Your event, thoughtfully planned.',
  serviceArea: 'UK/Ireland',
  colours: {
    berry: '#3d1a2e',
    fuchsia: '#c24d7e',
    blush: '#e8829c',
    petal: '#f2dde8',
    gold: '#f7c344'
  }
} as const

export const siteConfig = {
  meta: {
    title: 'Mary-Jo Corporate Events | Your event, thoughtfully planned',
    description:
      'Warm, thoughtful corporate event planning for conferences, away days, launches, award nights, and leadership retreats across the UK and Ireland.',
    url: 'https://maryjo-events.com'
  },
  contact: {
    email: 'hello@maryjo.events',
    formAction: '/thank-you',
    calendarUrl: ''
  }
} as const

export const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
] as const

export const services = [
  {
    title: 'Conferences',
    text: 'Clear plans for agendas, guests, suppliers, timings, and all the small details that make the day feel steady.'
  },
  {
    title: 'Executive summits',
    text: 'Thoughtful support for leadership groups who need the room, rhythm, and guest experience to feel considered.'
  },
  {
    title: 'Award nights',
    text: 'A careful eye on the run of show, arrivals, stage moments, and the touches people remember afterwards.'
  },
  {
    title: 'Product launches',
    text: 'Practical planning for a confident reveal, from guest flow and supplier notes to the moment everyone sees it.'
  },
  {
    title: 'Team away days',
    text: 'Warm, organised support for off-sites that need to feel useful, relaxed, and worth leaving the office for.'
  },
  {
    title: 'Networking evenings',
    text: 'Easy, welcoming events where guests know where to go, what is happening, and why they are glad they came.'
  }
] as const

export const processSteps = [
  {
    kicker: '01',
    title: 'I listen first',
    text: 'I ask good questions about the people, the purpose, the pressure points, and what would make the event feel like a success.'
  },
  {
    kicker: '02',
    title: 'I shape the plan',
    text: 'I turn the brief into timings, supplier notes, guest considerations, and clear next steps so nothing important floats around in your head.'
  },
  {
    kicker: '03',
    title: 'I keep checking',
    text: 'I care about the details other people overlook: signage, arrivals, dietary notes, room flow, speaker needs, and the quiet fixes.'
  },
  {
    kicker: '04',
    title: 'I stay honest',
    text: 'If something needs learning, asking, or solving, I say so early and get stuck in. New to the industry does not mean vague.'
  }
] as const

export const eventTypes = [
  'First big conference',
  'Leadership retreat',
  'Company away day',
  'Brand or product moment',
  'Industry mixer',
  'Awards or ceremony'
] as const

export const proofPoints = [
  'A clear written plan after discovery',
  'Supplier and venue questions captured early',
  'Guest experience thought through from arrival to goodbye',
  'Warm updates without pressure or jargon',
  'A planner who cares because every brief still feels exciting'
] as const

export const faqs = [
  {
    question: 'What size events do you support?',
    answer:
      'Businesses of all sizes are welcome. The first conversation is about what you need, not whether you sound big enough.'
  },
  {
    question: 'Can you help if the idea is still messy?',
    answer:
      'Yes. I like the early questions: purpose, audience, mood, budget, timing, and what has to feel easy for your team.'
  },
  {
    question: 'Do you work across the UK and Ireland?',
    answer:
      'That is the launch service area. For anything outside it, ask and I will be upfront about what is practical.'
  }
] as const
