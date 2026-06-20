import { readFile } from 'node:fs/promises'

const args = new Map(
  process.argv
    .slice(2)
    .map((arg) => arg.split('='))
    .filter(([key, value]) => key.startsWith('--') && value)
    .map(([key, value]) => [key.slice(2), value])
)

const endpoint = args.get('endpoint') || process.env.NUXT_PUBLIC_FORM_ENDPOINT || (await readDefaultEndpoint())

if (!endpoint || endpoint === '/thank-you') {
  console.error('No Apps Script endpoint is configured. Set NUXT_PUBLIC_FORM_ENDPOINT or data/site.ts contact.formAction.')
  process.exit(1)
}

const timestamp = new Date().toISOString()
const payload = {
  name: `MaryJo Smoke Test ${timestamp}`,
  email: args.get('email') || 'tochimba26@gmail.com',
  company: args.get('company') || 'Mary-Jo Events test',
  eventType: args.get('eventType') || 'Product launch',
  date: args.get('date') || futureDate(),
  location: args.get('location') || 'London',
  guestCount: args.get('guestCount') || '12',
  budget: args.get('budget') || 'I am not sure yet',
  message: `This is an automated smoke test from the maryjo-events repo at ${timestamp}. Please delete this test enquiry after confirming delivery.`,
  consent: 'on',
  website: '',
  diagnostic: 'json'
}

console.log(`Submitting smoke test to:\n${endpoint}\n`)
console.log(`Test enquiry name: ${payload.name}`)
console.log(`Reply-to email: ${payload.email}\n`)

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: new URLSearchParams(payload),
  redirect: 'follow'
})

const body = await response.text()
const diagnostic = parseJson(body)
const bodyPreview = body.replace(/\s+/g, ' ').trim().slice(0, 600)
const looksSuccessful =
  response.ok &&
  (diagnostic?.ok === true ||
    response.url.includes('/thank-you') ||
    body.includes('Redirecting') ||
    body.includes('maryjo-events.com/thank-you'))

console.log(`HTTP status: ${response.status} ${response.statusText}`)
console.log(`Final URL: ${response.url}`)
console.log(`Response looked successful: ${looksSuccessful ? 'yes' : 'no'}`)

if (diagnostic) {
  console.log('\nDiagnostic JSON:')
  console.log(JSON.stringify(diagnostic, null, 2))
}

console.log('\nResponse preview:')
console.log(bodyPreview || '(empty body)')

if (!looksSuccessful) {
  if (!diagnostic) {
    console.error(
      '\nThe endpoint did not return diagnostic JSON. Copy the latest scripts/google-apps-script/contact-form.gs into Apps Script, save it, and create a new Web App deployment version.'
    )
  }

  console.error(
    '\nSmoke test did not see the expected thank-you redirect. Check the Apps Script deployment, permissions, script properties, and execution logs.'
  )
  process.exit(1)
}

console.log('\nSmoke test submitted. Check the Google Form responses and tochimba26@gmail.com inbox for the test enquiry.')

async function readDefaultEndpoint() {
  const siteConfig = await readFile(new URL('../data/site.ts', import.meta.url), 'utf8')
  const match = siteConfig.match(/formAction:\s*(?:\r?\n\s*)?['"]([^'"]+)['"]/)
  return match?.[1] || ''
}

function futureDate() {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  return date.toISOString().slice(0, 10)
}

function parseJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
