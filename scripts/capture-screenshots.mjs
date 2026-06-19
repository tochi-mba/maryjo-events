import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { createServer } from 'node:net'
import { chromium } from '@playwright/test'

async function findPort(start = 3000) {
  for (let port = start; port < start + 20; port += 1) {
    const available = await new Promise((resolve) => {
      const probe = createServer()
      probe.once('error', () => resolve(false))
      probe.once('listening', () => {
        probe.close(() => resolve(true))
      })
      probe.listen(port, '127.0.0.1')
    })

    if (available) return port
  }

  throw new Error('Could not find an available local port for screenshot capture.')
}

const port = await findPort(Number(process.env.VISUAL_PORT || 3000))
const baseUrl = `http://127.0.0.1:${port}`
const server = spawn(process.execPath, ['scripts/static-server.mjs', '.output/public', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: false
})

function waitForServer() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Static server did not start in time.')), 30_000)
    server.stdout.on('data', (chunk) => {
      if (chunk.toString().includes('Static server running')) {
        clearTimeout(timeout)
        resolve()
      }
    })
    server.stderr.on('data', (chunk) => process.stderr.write(chunk.toString()))
  })
}

const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['tablet', { width: 768, height: 1024 }],
  ['mobile', { width: 375, height: 812 }]
]

try {
  await waitForServer()
  await mkdir('test-results/visual', { recursive: true })
  const browser = await chromium.launch()

  for (const [name, viewport] of viewports) {
    const page = await browser.newPage({ viewport })
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      const step = Math.max(window.innerHeight * 0.75, 320)
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((resolve) => window.setTimeout(resolve, 80))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0))
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (overflow > 1) {
      throw new Error(`${name} viewport has ${overflow}px of horizontal overflow.`)
    }
    await page.screenshot({ path: `test-results/visual/${name}.png`, fullPage: true })
    await page.close()
  }

  await browser.close()
  server.kill('SIGTERM')
} catch (error) {
  server.kill('SIGTERM')
  console.error(error)
  process.exit(1)
}
