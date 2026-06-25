export const brand = {
  name: 'Mary-Jo Corporate Events',
  shortName: 'Mary-Jo',
  label: 'CORPORATE EVENTS',
  founder: 'Mary-Josephine Murphy',
  tagline: 'Your event, thoughtfully planned.',
  serviceArea: 'Global',
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
      'Warm, thoughtful corporate event planning for away days, launches, and award nights.',
    url: 'https://maryjo-events.com'
  },
  contact: {
    email: 'murphy.mary@me.com',
    formAction:
      'https://script.google.com/macros/s/AKfycbyVjfXm5LsEPj_GjhARfEiWygtoyDNx41LPYDkbQe6nC3yqya_SrD4tjW6z3nUPLzrQUQ/exec',
    calendarUrl: ''
  }
} as const

export const navigation = [
  { label: 'Services', href: '#event-fit' },
  { label: 'Contact', href: '#contact' }
] as const

export const homepageSections = {
  services: false,
  approach: false,
  about: false,
  proof: false
} as const

export const services = [
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

export const marqueeItems = [
  'Thoughtful planning',
  'Warm updates',
  'Details looked after',
  'Honest conversations',
  'Calm event days',
  'UK & Ireland'
] as const
