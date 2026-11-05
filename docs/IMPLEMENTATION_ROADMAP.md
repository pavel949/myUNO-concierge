# myUNO Concierge — Implementation Roadmap and gates
Version 1.0 | All tasks must be completed in sequence. **Never report code-only completion as production-ready.**

## Working rules
- Work only in `pavel949/myUNO-concierge` unless explicitly authorized.
- Read MASTER_PRD.md, this roadmap and AGENT_HANDOFF.md before edits.
- Separate confirmed code facts from unverified deployed behavior.
- Make small, testable commits; run CI and show evidence.
- Do not put secrets, real customer data or API service-role keys in git.
- Each phase: deliverables, automated checks, manual verification, acceptance, blockers, rollback notes.
- Any unresolved P0 security or correctness issue blocks the next phase.

### Phase 0 — Baseline and infrastructure
Deliver: README, lockfile, clean build, tests, CI workflow, environment example, staging configuration, source ownership map, architecture decision records. Verify Vite client + Vercel API runtime. Gate: clean build and tests; staging endpoint reachable; no credentials committed.
### Phase 1 — Public catalogs (read only)
Deliver: typed normalized Service/Property models, myuno public Supabase adapters, myUNO-final public REST adapters, timeouts, source attribution, partial errors, pagination, source-ID mapping. No private data. Gate: real staging calls with valid environment, schema snapshots, no leaked fields, mobile results display. Existing `api/catalog.js` is a scaffold, **not verified production integration**.
### Phase 2 — Guest context and authorization
Deliver: operator-approved Layantara and condo project IDs, QR destination routing, expiring booking-bound invites or authenticated guest login, scoped stay data, session revocation, privacy notice. Gate: negative auth tests across guest, unit, project and expired invite; operator review.
### Phase 3 — Knowledge and concierge UX
Deliver: localized approved stay guides, Wi-Fi/private facts behind auth, one-button voice + text, error/fallback states, accessibility, concise result cards. Gate: EN/RU/TH content review; phone QA; no fabricated answers.
### Phase 4 — Real guest tickets
Deliver: validated request form, explicit submit confirmation, idempotency, authenticated write adapter to myUNO-final tickets, persisted status, staff inbox/assignment, audit. Gate: real staging request → staff receipt → staff response → guest update, no duplicate on retry.
### Phase 5 — Commerce requests and supplier handoff
Deliver: transfer/boat/flowers offer selection, quote-request states, contact-sharing consent, provider assignment and response, quote expiry, commercial attribution. Gate: supplier acceptance verified, guest sees exact status, no unapproved booking or commission.
### Phase 6 — Voice AI and translation
Deliver: replaceable STT/TTS, inexpensive model routing, budget caps, RU/EN/TH evaluation, text fallback, privacy and retention controls. Gate: documented latency, transcription and cost test on real accents/noise, human escalation.
### Phase 7 — Pilot release
Deliver: staging signoff, security review, operational runbook, QR rollout to Layantara then approved condo units, feature flags, alerts, rollback, support contacts, KPI dashboard. Gate: no critical issues, operator signoff, 7-day monitored pilot.
### Phase 8 — Scale decision
Deliver: 30-day metrics: users, requests, supplier confirmations, fulfilled orders, staff time, revenue, AI cost, complaints, retention. Founder go/no-go before adding supplier self-service, new destinations, WhatsApp, visa/medical workflows or automatic purchases.

## Dependency map
P0→P1→P2→P3→P4→P5→P6→P7→P8. Parallelize only independent tests/docs inside a phase. Do not bypass P2 for private stay or P4 for real requests.

## Phase status as of 2026-11-05
P0 **partial** (scaffold exists; CI/build unverified).
P1 **partial** (read-only adapters and UI committed; credentials and live responses unverified).
P2–P8 **not implemented**.
No deployed product, live AI or operational booking confirmed.

## Mandatory agent completion report
For each task report: commit URL; files changed; tests executed and results; environment tested; verified user-facing behavior; remaining blockers; next smallest safe task. Never mark a gate passed without evidence.
