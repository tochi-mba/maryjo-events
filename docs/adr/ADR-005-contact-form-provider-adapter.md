# ADR-005: Contact Form Provider Adapter

## Status
Accepted

## Decision
Build a static HTML form whose `action` and related provider details are configured from typed site config.

## Rationale
The site must launch statically while leaving room to connect Google Forms, Formspree, Netlify Forms, or a calendar later.

## Consequences
- The default v1 contact path is form-first.
- Calendar booking is an optional secondary CTA.
- No backend is required for launch.
