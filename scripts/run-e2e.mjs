import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

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

  throw new Error('Could not find an available local port for e2e tests.')
}

const port = await findPort(Number(process.env.E2E_PORT || 3000))
const baseUrl = `http://127.0.0.1:${port}`
const server = spawn(process.execPath, ['scripts/static-server.mjs', '.output/public', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: false
})

function waitForServer() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Static server did not start in time.')), 30_000)

    server.stdout.on('data', (chunk) => {
      const text = chunk.toString()
      process.stdout.write(`[static] ${text}`)
      if (text.includes('Static server running')) {
        clearTimeout(timeout)
        resolve()
      }
    })

    server.stderr.on('data', (chunk) => {
      process.stderr.write(`[static] ${chunk.toString()}`)
    })

    server.on('exit', (code) => {
      if (code !== 0) {
        clearTimeout(timeout)
        reject(new Error(`Static server exited with code ${code}.`))
      }
    })
  })
}

function runPlaywright() {
  return new Promise((resolve) => {
    const command = process.platform === 'win32' ? 'npx.cmd' : 'npx'
    const child = spawn(command, ['playwright', 'test'], {
      env: { ...process.env, PLAYWRIGHT_BASE_URL: baseUrl },
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })

    child.on('exit', (code) => resolve(code || 0))
  })
}

try {
  await waitForServer()
  const code = await runPlaywright()
  server.kill('SIGTERM')
  process.exit(code)
} catch (error) {
  server.kill('SIGTERM')
  console.error(error)
  process.exit(1)
}
