# Mary-Jo Corporate Events

A static Nuxt, Vue, and TypeScript website for Mary-Jo Corporate Events.

## Commands

- `npm.cmd install`
- `npm.cmd run dev`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run test`
- `npm.cmd run generate`
- `npm.cmd run test:e2e`

The contact form provider, site URL, calendar URL, and final email live in `data/site.ts`.

## Previewing the static output

Use either:

- `node scripts/static-server.mjs .output/public 3000`
- VS Code Live Server from this workspace. `.vscode/settings.json` points Live Server at `.output/public`, so absolute Nuxt asset URLs such as `/_nuxt/...` and `/images/...` resolve correctly.

Do not serve the workspace root as the website root, or generated Nuxt assets will 404.
