import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve(process.argv[2] || '.output/public')
const port = Number(process.argv[3] || 3000)
const host = process.argv[4] || '127.0.0.1'

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
}

function resolveFile(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname)
  const clean = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  const direct = join(root, clean)

  if (existsSync(direct) && statSync(direct).isFile()) return direct
  if (existsSync(join(direct, 'index.html'))) return join(direct, 'index.html')
  return join(root, 'index.html')
}

const server = createServer((request, response) => {
  const file = resolveFile(request.url || '/')
  const extension = extname(file)
  response.writeHead(200, {
    'content-type': types[extension] || 'application/octet-stream'
  })
  createReadStream(file).pipe(response)
}).listen(port, host, () => {
  console.log(`Static server running at http://${host}:${port}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
  })
}
