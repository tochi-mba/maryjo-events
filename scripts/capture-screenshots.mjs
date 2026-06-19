import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const server = spawn(process.execPath, ['scripts/static-server.mjs', '.output/public', '3000'], {
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
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0))
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
