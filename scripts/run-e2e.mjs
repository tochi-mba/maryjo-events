import { spawn } from 'node:child_process'

const server = spawn(process.execPath, ['scripts/static-server.mjs', '.output/public', '3000'], {
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
