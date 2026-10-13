# EarnedLine website

A complete 27-page marketing website and isolated synthetic product demo, built from the approved Line Signature brand kit. Homepage: Evidence in Motion. Supporting pages: Signal to Decision.

## Run

- `npm ci`
- `npm run dev` for development at http://127.0.0.1:8188
- `npm run build` to compile and pre-render all 27 routes
- `npm run preview` to inspect the production files at http://127.0.0.1:8188

The production preview server serves each route's own HTML and supports MP4 byte-range requests. `dist/` is the portable static deployment output. The source includes a Vercel configuration for a later Vercel deployment; no custom domain is connected in this assignment.

## Included

- Home, why, product overview, five product modules, workflow, use cases, synthetic demo, pilot/pricing, two intake routes, controls, evaluation, resources and three guides, about, contact, sign-in, privacy, terms, receipt and 404.
- Original desktop/portrait 18-second hero films, posters, six dashboard layouts, independent section exhibits, charts, source panels and an editable review path.
- Mega menus, mobile focus-trapped navigation, keyboard tabs, flip/shutter treatments, consent and validation states, reduced-motion preference and video controls.
- Self-hosted fonts, SVG identity, favicon and icon assets with licenses.
- Page metadata, canonical/OG tags, static route HTML and a 404 fallback. The private concept preview is set to noindex.

## Product boundaries

All organizations, reviewers, documents, events, amounts and outcomes are fictional. Acme CT-22/C-22 is signed 12 Aug 2026 and effective 1 Sep 2026; USG-SEP22 has 12,000 events, 10,000 included and USD 0.04 per extra event. Invoice I-88 has a fictional USD 2,000 base fee and no overage line. The USD 80 gross candidate is not verified. CR-40 is USD 40 with applicability pending; USD 40 net is a conditional branch. Historical billability is separate.

The demo supports in-memory decisions, editable assumptions, reasons, source evidence and an illustrative JSON export after simulated approval. It does not send messages, issue invoices, collect payments, upload records or write to billing/CRM/ERP/bank systems.

## Forms, auth and analytics

Forms currently validate locally and prepare an inquiry draft. No delivery endpoint is configured; nothing is sent or stored. Production authentication is not connected. Sign-in is a complete prototype presentation with no credential collection.

The nine-event map records only permitted context in an in-memory journal, not financial records or form text. It has no external analytics receiver. Motion preference is the only website preference stored in localStorage.

Before connecting an actual intake endpoint through `VITE_INTAKE_ENDPOINT`, supply a verified recipient/service, confirm handling and consent, align delivery copy and legal notices, and test actual success and retry behavior. No raw source-record upload should be added to the public form.

LinkedIn and Crunchbase marks are included, but company profile URLs have not been supplied; footer labels remain inactive. Pilot prices are hypothetical test prices. Legal notices are drafts that need the final entity and actual processing details before an operational launch.

## Main files

- `src/App.jsx`: page compositions, navigation, forms, film controls and site components
- `src/Visuals.jsx`: independent figures, diagrams and charts
- `src/Workbench.jsx`: synthetic record review, modules and approval gates
- `src/content.js` / `src/registry.json`: original copy and 27-route IA
- `src/styles.css` / `src/tokens.css`: visual system, responsive layouts and motion
- `scripts/prerender.mjs`: static route and metadata generation
- `hero-video/`: reproducible Remotion source, fonts/licenses, decoded QA frames and rendering metadata
- `screenshots/` / `qa-report.json`: browser evidence and verification results
