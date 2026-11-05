# PILOT SCOPE — subordinate to Ultimate Product PRD

This file describes the **first Layantara/condominium pilot only**. The full intended product is defined in [ULTIMATE_PRODUCT_PRD.md](ULTIMATE_PRODUCT_PRD.md). Do not treat MVP exclusions as permanent product exclusions.

# myUNO Concierge — Master PRD
Version: 1.0 canonical for **myUNO Concierge** | 2026-11-05 | Status: approved direction, implementation pending

> This is the controlling product specification for this repository. Earlier MALI PRDs describe a broader vision, **not the MVP scope**. Do not rename the product MALI. Do not merge myuno with myUNO-final.

## 1. Executive decision
Build a standalone mobile-first, multilingual, voice-and-text concierge for **Layantara Villas and selected managed condominium guests**. A guest scans a QR code, asks a question, searches available services or property information, and submits a traceable request. Staff or approved suppliers confirm execution. The same platform can later be white-labelled for other operators/destinations.

## 2. Target customers and jobs
- Guest: arrival instructions, house rules, Wi-Fi, contact reception, maintenance, housekeeping, transfer, boats, excursions, flowers, nearby places, translation.
- Reception/operations: receive, triage, assign, respond, close requests; audit status and response time.
- Supplier: receive scoped request, quote, confirm or decline; later self-manage offerings.
- Operator/admin: manage property content, partner catalog, permissions, attribution, quality, commercial reporting.
- Owner/agent: future phase; no access to guest private information without authorization.

## 3. Non-negotiable principles
- One friendly assistant, **one microphone button plus text field**, EN/RU/TH. Mobile web first, PWA optional.
- Anonymous QR permits only public content. Private stay, bookings, unit access codes and requests require verified guest authorization.
- Do not claim a booking, price or supplier response is confirmed unless evidenced by source.
- Never transfer private conversations into sales CRM without explicit, purpose-specific consent.
- Never give LLM direct database, payment, email, WhatsApp or admin credentials. All actions pass scoped server tools.
- No changes to production myuno/myUNO-final in initial pilot. Connect using separate documented adapters.
- Prefer inexpensive models; no arbitrary autonomous tool loops. Manual staff fallback.
- Every real workflow must be tested end-to-end. A demo card or local-only request is not completion.

## 4. Scope by release
### Pilot MVP (P0)
Guest web app; EN/RU/TH; text interaction; browser voice input with text fallback; property/public service discovery; verified guest identity; ticket/request creation; staff inbox/handoff; consent; request status; event audit; operator-controlled property knowledge; source labels; staging release and monitoring.
### Pilot enhancements (P1)
Server-side voice recognition/speech playback, two-way translation, vetted external search, structured quotes, supplier replies, commercial attribution, reminders and notifications.
### Later (P2)
Provider onboarding by voice/PDF/website; provider portals; payments with separate approvals; autonomous reservations via approved APIs; email/LINE/WhatsApp supported integrations; other destinations; emergency institutional partnerships.
### Explicit exclusions from MVP
Unrestricted autonomous web purchases, police/medical decision-making, mass Telegram/WhatsApp scraping, unverified visa/legal advice, full OpenClaw hosting for each guest, bulk replication of Google Places, direct database federation.

## 5. Primary journeys and acceptance
**J1 Anonymous QR:** scan property QR → localized welcome → public property description and general help. No private stay details exposed. QR alone never grants booking privileges.
**J2 Verified guest:** verify signed booking invitation or existing authorized login → show unit/stay-specific instructions scoped to exact booking → revoke on checkout/expiry.
**J3 Guest service ticket:** ask for cleaning/repair → classify intent → show summary → guest confirms → POST via server adapter → obtain persistent ID → staff sees assigned ticket → status changes visible to guest.
**J4 Commerce:** ask for boat/transfer → search public and vetted catalogs → show offer source and whether price/availability is unconfirmed → request quote → explicit consent for contact sharing → operator/supplier accepts → guest sees confirmation.
**J5 Translation:** guest and staff choose languages → transcribe → display original and translated text → read aloud where supported; no guarantee of medical/legal accuracy.
**J6 Failure:** upstream timeout → truthful message, no invented results, retry option, optional staff handoff; never mark action successful.
**J7 Staff:** see only authorized project tickets; update status with audit event; guest receives a safe status update.

## 6. UX/UI
Home: warm neutral premium myUNO design; clear welcome; prominent large mic; equally accessible text composer; language switch; shortcuts: My Stay, Help, Transfers, Boats, Explore Phuket, Translation. Results are concise cards with price/unit, source, verification and primary CTA. Request tracker: draft, awaiting guest confirmation, submitted, accepted, in progress, completed, cancelled, failed. Provide keyboard navigation, readable contrast, touch targets ≥44px, screen-reader labels, low-bandwidth fallback. No mandatory account for general information. Ask only for essential details progressively.

## 7. Functional domains
**Stay:** project/unit scoped guides, rules, Wi-Fi only after authorization, arrival/departure, reception contacts, maintenance/housekeeping.
**Services:** catalog by category, localized description, supplier identity, media, pricing model, coverage, quote/request availability.
**Property:** public rental and sale catalog, project/unit filters, currency, location, amenities, public media; never expose owner/guest private data.
**Market search:** external sources with attribution, freshness and terms compliance; distinguish found from verified/confirmed.
**Events/places:** later; official event organizer links and current venue metadata, never fake tickets.
**Assistance:** emergency direct dial and location sharing only with consent; AI not a replacement for emergency services.
**Personal:** preferences and history with user deletion/export; default minimum retention.
**Business:** provider identity verification, offer creation/import, approval, request acceptance and commission terms; P2 for self-service onboarding.

## 8. Architecture and boundaries
Client (React PWA) → Concierge API/BFF (session, consent, rate limits, policy) → Orchestrator (intent classifier, deterministic workflow router, model gateway) → read-only adapters (myuno, myUNO-final, external discovery) / authorized write adapters (tickets, requests) → event log + operational database. Async jobs handle retries, notifications and long-running tasks. No direct client access to privileged APIs.
- **myuno**: public service catalog via Supabase `public_service_catalog`, public property projection `public_property_catalog`; public anon key and RLS only.
- **myUNO-final**: `GET /api/services`, `GET /api/search/units`, `GET/POST /api/tickets` with authenticated guest identity and stake checks; verify deployed schema, dates, roles and API contract before enabling writes.
- Avoid duplicating catalog records. Store canonical source IDs, last-seen timestamp, mappings and only allowed cached fields. Never merge source IDs without an explicit crosswalk.
- A source can be unavailable; expose partial results and health status.

## 9. Data model (logical; reuse existing where possible)
Destination, PropertyContext, GuestSession, BookingAccessGrant, Conversation, Message, ConsentRecord, SourceRegistry, CatalogSourceMapping, ServiceOfferSnapshot, ConciergeRequest, RequestEvent, StaffAssignment, ProviderReferral, Quote, ProviderAgreement, CommissionRule, CommissionLedgerEntry, AuditEvent, KnowledgeDocument, KnowledgeRevision, AgentToolCall. Every tenant/project-scoped row includes tenant/project ID. IDs immutable; requests idempotent.
State machine: draft → awaiting_confirmation → submitted → accepted|declined → in_progress → completed|cancelled; failures are explicit and recoverable. Quote snapshots immutable after acceptance. Money values use integer minor units, currency and tax basis.

## 10. API contracts (proposed, not existing endpoints)
`GET /api/catalog?kind=services|properties&limit=...` public aggregated read, source status and partial flag.
`POST /api/session/verify` exchange one-time signed booking invitation for scoped short-lived session.
`GET /api/stay` authenticated and scoped stay details.
`POST /api/requests` validated intent, booking scope, consent reference, idempotency key → persisted request ID.
`GET /api/requests/:id` owner or authorized staff only.
`POST /api/requests/:id/confirm` explicit guest approval.
`POST /api/operator/requests/:id/status` scoped staff role with audit.
`POST /api/assistant/respond` text, locale, context, tool budget; no raw secret exposure.
Document request/response schemas, authorization, error codes, retry and rate limits in OpenAPI before production.

## 11. AI runtime and cost control
Single personal assistant UI, intent router, skills and deterministic workflows; no swarm of always-on agents. Small inexpensive model for classification/FAQ; retrieve authoritative source for factual answers; larger model only for complex tasks. Voice pipeline is pluggable (STT → language/intent → tool → TTS), with text-only fallback. Limit token/tool/time budget per request; record cost by tenant, action and model. Prevent prompt injection from websites, documents and messages; tool arguments validated against schemas. No unrestricted browser automation for MVP.

## 12. Knowledge and freshness
Knowledge is not one giant prompt. SourceRegistry stores owner, authority, URL, license, locale, destination, last verified, expiry and review status. Structured data for price/availability; retrieval index for narrative guides. Official immigration/medical information is dated and linked; unclear cases escalate to human expert. Property instructions approved by operator; expired or conflicting facts are hidden/flagged. Source connectors obey access terms and deletion requests.

## 13. Security, privacy, compliance
TLS; secrets server-side; RLS/tenant isolation; RBAC; guest booking-bound scope; least privilege; token expiry and revocation; audit logs; encryption at rest; backups and restore tests; retention schedule; privacy notices and consent records; deletion/export flow; abuse protection and monitoring. No raw payment credentials or unrestricted inbox access. Thai PDPA and cross-border processing reviewed before public rollout. Security review required before any real guest data.

## 14. Commercial model
Pilot first measures guest engagement, successful service request conversion, supplier acceptance, response SLA, staff minutes saved, gross commission and **net** contribution after AI and operations. B2B subscription + service commission later; partner payout only against documented agreement and fulfilled order. No hidden paid ranking.

## 15. Analytics and operations
Events: qr_opened, language_selected, mic_used, query_submitted, search_completed, offer_viewed, consent_granted, request_created, request_accepted, request_completed, handoff_requested, failure, cost_recorded. Dashboard by property/tenant and source, without exposing private conversations to unauthorized sales roles. Operational alerts for failing connectors, delayed requests and budget anomalies.

## 16. Quality gates
Build/typecheck/test; contract tests for both upstreams; auth negative tests (cross-booking, cross-property, expired QR); idempotency; retry/timeout; voice RU/EN/TH evaluation; mobile browser QA; accessibility; privacy; production-like staging smoke test. No fake success, no seeded production claims.

## 17. Rollout and ownership
Start with internal staff sandbox, then Layantara pilot and 3–5 authorized condominium units, then limited guest QR rollout. Require operator consent, verified project/unit IDs and trained fallback staff. Feature flags per property and kill switch. Founder owns commercial approvals; CTO owns architecture/security; operations owns SLA; content editor owns guides; supplier owner owns confirmation.

## 18. Decisions still open
Production URLs and API access; canonical project IDs; guest invite mechanism; approved staff recipients; source-of-truth for service offers; pricing/commission policy; voice provider and budget; exact retention period; staging environment; emergency contacts and legal review. Do not invent defaults that affect real customer data or payments.

## 19. Definition of done
A verified Layantara/condominium guest can ask in text, see truthful public services and property offers, submit a real request, have staff receive and update it, and see its persisted state. Guest cannot read another booking. Failed upstreams show failure, not success. Evidence includes CI logs, staging URL, test report and operator signoff.

## 20. Execution control
See [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md), [AGENT_HANDOFF.md](AGENT_HANDOFF.md), and [../docs/CATALOG_CONNECTORS.md](../docs/CATALOG_CONNECTORS.md). Developers must execute phases in order and stop at gates. This document is the product source of truth; existing MALI artifacts are background only.
