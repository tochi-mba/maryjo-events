# ADR-007: Quality Gates Before Launch

## Status
Accepted

## Decision
Launch only after typecheck, lint, tests, static generation, responsive review, accessibility review, contact form smoke test, and SEO checks pass.

## Rationale
The brief asks for a polished, inspectable site. Quality gates keep the launch honest.

## Consequences
- Required checks: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run generate`, and `npm run test:e2e`.
- The site should have clean mobile, tablet, and desktop layouts.
- Contact form behavior must remain accessible and provider-ready.
