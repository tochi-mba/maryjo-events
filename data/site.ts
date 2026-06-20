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
    email: 'tochimba26@gmail.com',
    formAction:
      'https://script.google.com/macros/s/AKfycby3qsSzH0HD6lqffPJLcSVXnm7vXv5K_oJRTzyURV70qeje3aCL2_veW3HUikoiZUUX9A/exec',
    calendarUrl: ''
  }
} as const

export const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Event fit', href: '#event-fit' },
  { label: 'What to expect', href: '#proof' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
] as const

export const services = [
  {
    title: 'Conferences',
    description:
      'Multi-session days that need to run smoothly, from registration desks to the closing remarks.',
    icon: 'presentation'
  },
  {
    title: 'Executive summits',
    description:
      'Smaller, higher-stakes gatherings where the details and the atmosphere both matter.',
    icon: 'crown'
  },
  {
    title: 'Award nights',
    description:
      'Celebrations that feel special, with timing, staging, and little touches handled for you.',
    icon: 'trophy'
  },
  {
    title: 'Product launches',
    description:
      'A clear moment to show something new, planned so the focus stays on what you are launching.',
    icon: 'rocket'
  },
  {
    title: 'Team away days',
    description:
      'Days out of the office that actually feel worthwhile, with the logistics quietly taken care of.',
    icon: 'users'
  },
  {
    title: 'Networking evenings',
    description:
      'Relaxed, well-paced evenings where your guests can connect without anything feeling stiff.',
    icon: 'wine'
  }
] as const

export const processSteps = [
  {
    step: '01',
    title: 'I listen first',
    description:
      'Before anything else, I want to understand what you are picturing, who is coming, and what would make the day feel right.',
    icon: 'ear'
  },
  {
    step: '02',
    title: 'I shape the plan',
    description:
      'I turn that conversation into a clear written plan, with the venue, suppliers, and timings mapped out so you can see it taking shape.',
    icon: 'pencil-ruler'
  },
  {
    step: '03',
    title: 'I keep checking',
    description:
      'As things move, I keep checking the details against the plan so nothing quietly slips through the cracks.',
    icon: 'check-circle'
  },
  {
    step: '04',
    title: 'I stay honest',
    description:
      'If something is not working or is not worth the spend, I will tell you. You will always get my real opinion.',
    icon: 'heart-handshake'
  }
] as const

export const eventTypes = [
  {
    title: 'A first big conference',
    description: 'The one where you want everything to feel considered and calm.'
  },
  {
    title: 'A leadership retreat',
    description: 'Time away that needs structure without feeling rigid.'
  },
  {
    title: 'A company away day',
    description: 'A proper break from the desk that still earns its place.'
  },
  {
    title: 'A brand or product moment',
    description: 'A launch or reveal that deserves a real sense of occasion.'
  },
  {
    title: 'An industry mixer',
    description: 'An evening built around easy conversation and good timing.'
  },
  {
    title: 'An awards or ceremony',
    description: 'A night of recognition, planned so it runs beautifully.'
  }
] as const

export const proofPoints = [
  {
    title: 'A clear written plan after discovery',
    description:
      'Once we have talked it through, you get the plan in writing, so we are always looking at the same thing.',
    icon: 'file-text'
  },
  {
    title: 'Supplier and venue questions captured early',
    description:
      'I ask the awkward questions up front, so surprises are far less likely later on.',
    icon: 'clipboard-list'
  },
  {
    title: 'Guest experience thought through',
    description:
      'From the moment people arrive to the way they say goodbye, the small things get real attention.',
    icon: 'sparkles'
  },
  {
    title: 'Warm updates without pressure or jargon',
    description:
      'You hear from me in plain language, kept in the loop without being buried in noise.',
    icon: 'message-circle'
  }
] as const

export const faqs = [
  {
    question: 'You are new to the industry - why should I trust you with my event?',
    answer:
      'I am honest about being new, and I think that is a strength. Every brief still feels genuinely exciting to me, so you get real care and full attention rather than someone running on autopilot.'
  },
  {
    question: 'What size of business do you work with?',
    answer:
      'Businesses of all sizes. Whether it is your first big conference or a regular fixture in the calendar, I would love to hear about it. The brief matters more to me than the headcount.'
  },
  {
    question: 'Where do you work?',
    answer:
      'Across the UK and Ireland. Tell me where your event needs to happen and I will figure out how to make it work.'
  },
  {
    question: 'How do we start?',
    answer:
      'We start with a conversation. You tell me what you have in mind, I listen properly, and then I shape that into a clear written plan. There is no pressure and no jargon.'
  },
  {
    question: 'How involved do I need to be?',
    answer:
      'As much or as little as you like. Some people want to be in every detail, others want to hand it over and hear warm updates along the way. Both are completely fine.'
  }
] as const

export const marqueeItems = [
  'Thoughtful planning',
  'Warm updates',
  'Details looked after',
  'Honest conversations',
  'Calm event days',
  'UK & Ireland'
] as const
