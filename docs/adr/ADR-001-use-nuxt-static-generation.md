# ADR-001: Use Nuxt Static Generation

## Status
Accepted

## Decision
Use Nuxt with TypeScript, static generation, and Vue single-file components.

## Rationale
Mary-Jo Corporate Events is a marketing site where first impression, crawlable content, and fast first paint matter. Nuxt keeps the implementation in Vue and TypeScript while producing static HTML and assets for hosting without an application server.

## Consequences
- Primary commands are `npm run dev`, `npm run build`, `npm run generate`, and `npm run preview`.
- Node must satisfy `^20.19.0 || >=22.12.0`.
- Pages should avoid unnecessary client-only state so generated HTML carries the core content.
