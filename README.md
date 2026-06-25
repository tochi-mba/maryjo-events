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

## Contact form backend

The branded contact form is built into the static Nuxt site, then posts to a Google Apps Script Web App in production.

1. Create or reuse a Google Form with these exact question titles: `Name`, `Email`, `Company`, `Event type`, `Approximate date`, `Location`, `Guest count`, `Budget range`, `Tell me what you need`, and `Consent`.
2. Copy `scripts/google-apps-script/contact-form.gs` into an Apps Script project.
3. Set Apps Script project properties:
   - `FORM_ID`: the Google Form ID.
   - `NOTIFICATION_EMAIL`: `murphy.mary@me.com`.
   - `THANK_YOU_URL`: `https://maryjo-events.com/thank-you`.
4. Deploy the script as a Web App that runs as the script owner and is accessible to anyone.
5. The default Web App endpoint is configured in `data/site.ts`. Set `NUXT_PUBLIC_FORM_ENDPOINT` only when you need to override it for a different deployment.

If neither `NUXT_PUBLIC_FORM_ENDPOINT` nor the `data/site.ts` endpoint is set, the form should fall back to the local `/thank-you` route for development.

To smoke-test the deployed Apps Script endpoint from this repo, run:

- `npm.cmd run test:contact`

That sends a clearly marked test enquiry to the configured endpoint. After it runs, check the Google Form responses and the `murphy.mary@me.com` inbox for the test message, then delete the test response.

## Previewing the static output

Use either:

- `node scripts/static-server.mjs .output/public 3000`
- VS Code Live Server from this workspace. `.vscode/settings.json` points Live Server at `.output/public`, so absolute Nuxt asset URLs such as `/_nuxt/...` and `/images/...` resolve correctly.

Do not serve the workspace root as the website root, or generated Nuxt assets will 404.

## GitHub Pages deployment

This repo deploys through `.github/workflows/deploy-github-pages.yml`.

In GitHub, go to `Settings` -> `Pages` and set `Build and deployment` to `GitHub Actions`. Set the custom domain to:

`maryjo-events.com`

Every push to `main` will generate the static site and publish `.output/public` to:

`https://maryjo-events.com/`

The generated `public/CNAME` file keeps the custom domain attached when GitHub Pages deploys. Local development should use `npm run dev`; `npm run generate` is kept for the deployment/static build only.
