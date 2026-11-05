# myUNO Concierge — Ultimate Product Vision & Master PRD
**Version 4.0 · 2026-11-05 · Canonical end-state product specification**

> **Normative product vision, not an MVP backlog.** This document defines the COMPLETE intended product and its architecture. [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) defines phased delivery. Never confuse phase exclusions with ultimate product exclusions. Product name: **myUNO Concierge** (not MALI). Initial destination: Phuket. Future scope: any supported destination. Separate upstream systems: `myuno` (public platform) and `myUNO-final` (operations).

## 0. Founder thesis
**One trusted assistant. One conversation. Access to the real world.** The assistant serves locals, tourists, expatriates, property owners, service providers, agencies, businesses and institutions. A person should be able to ask or speak naturally, receive trustworthy grounded answers, and delegate real-world tasks from discovery to verified completion. Unlike a voice search engine, Concierge has permissioned connections to real supply, live inventory, providers, communication channels, human operators, booking systems and commerce infrastructure. Its core asset is not the language model; it is a trusted, executable network of destination-specific services and data.

**North-star outcome:** a completed, verified user goal with an auditable trail, not a chat response or click.

## 1. Product scope and audiences
- **Personal:** residents, visitors, expatriates, families, students, remote workers and local Thai speakers.
- **Guest:** visitors to villas, condominiums, hotels, resorts and serviced apartments.
- **Business:** every supplier, including one-person businesses without a website; AI sales and service desk.
- **Professional:** real estate agents, property managers, immigration/legal/insurance advisers, event organizers and tour operators.
- **Institutional:** opt-in, formally agreed hospital/police/public-service translator and assistance interfaces; no representation of official affiliation without contract.
- **Operator:** destination managers, human concierge, verification editors, commercial team, finance and compliance.
A person may hold multiple roles in one account; each role has scoped permissions and distinct data views.

## 2. Universal interaction and distribution
Mobile-first responsive web/PWA, native mobile optional later. Start via QR, partner referral, website, shared link, LINE or other permitted messaging entry points. Guest can ask public questions without an account; private actions require progressive identity verification. One prominent push-to-talk button plus equally capable text composer, voice playback, clear transcript, source cards, quick actions, and a persistent **My Tasks** list. English, Thai, Russian at launch, with language packs for later destinations. Automatic language recognition with manual override. Conversation history, accessible large type, screen-reader support, slow network fallback, safe interruption, low cognitive load. No model selection, API key or GitHub installation for end users.

### Onboarding
Ask preferred name/language, destination and what help is wanted. Optional conversational profile: family, dietary/accessibility preferences, home/work, travel plans, budget; explicit purpose-based consent and edit/delete controls. Connect Gmail/calendar/messaging/business systems using official authorization and least privilege. Never require sensitive profile details for general search.

### Distribution
Property QR codes and pre-arrival links; reception desks; guest communications; agent referrals; partner-specific QR codes; suppliers sharing their AI storefront; local businesses; referral incentives; organic search and local content; later institutional deployments. Each acquisition source has transparent attribution, fraud checks and opt-in marketing. Measure activation, retention, completed goals, CAC, contribution margin and referral conversion. No dependence on speculative 7-Eleven partnerships.

## 3. Full user capability map
**Discover & explore:** destinations, neighborhoods, attractions, restaurants, shops, beaches, maps, opening hours, routes, local transport, events, concerts, clubs, sports, festivals, Thai holidays, organizer links, tickets and current advisories.
**Travel & mobility:** flights, hotels, airport pickup, Grab/other taxis where approved, rental cars/bikes, boats/yachts, tours, ferries, activities, itineraries, luggage and special assistance.
**Stay & property operations:** guest check-in/out, Wi-Fi, house rules, maintenance, housekeeping, amenities, owner/guest messaging, bookings, rates, extensions, move-in/out, incident reports.
**Real estate:** short/long-term rentals, off-plan and resale search, viewings, offers, ownership questions, property management, due diligence referrals, financial comparisons with transparent assumptions.
**Everyday commerce:** groceries, drinking water, food delivery, flowers, cleaning, repairs, laundry, home services, childcare, pet care, wellness, classes and shopping.
**Relocation & immigration:** official visa options, application checklists, immigration deadlines, TM30 and related processes where applicable, work/business setup, banking, insurance, schools, utilities, driving and local administrative tasks. Always cite dated official rules; specialist referral for regulated advice.
**Communication:** email search/drafts/send with confirmation, calendar, reminders, translation, transcription, permitted LINE/WhatsApp Business/Telegram interactions, forms and documents, follow-ups.
**Help & safety:** hospitals, pharmacies, emergency contacts, consulates, tourist police, roadside assistance, emergency direct-call access, consented location sharing, live interpreter escalation. AI never delays emergency calls, impersonates officials or replaces medical/legal judgment.
**Life management:** personal memory, routines, task monitoring, renewals, follow-ups, scheduling and notifications, with explicit permissions and cost budgets.

Each domain must support the levels: **inform → find → compare → request → negotiate/quote → confirm → execute → track → close**, to the extent authorized and technically available. Do not represent unsupported levels as implemented.

## 4. Domain architecture: one assistant, many skills
**One user-facing Concierge**, one orchestrator and one task list. Internally use reusable **Domain Packs** (Boats, Property, Stay, Immigration, Health, Transport, Events, Everyday, Communication, etc.). A Domain Pack comprises: taxonomy, grounded knowledge, structured entities, validated tool definitions, deterministic workflows, permissions, provider criteria, commercial rules, quality tests and escalation instructions. Most tasks use inexpensive single-model routing + tools. Dedicated specialist agents only for proven multi-step complexity; no expensive always-on swarm. Domain Packs are reusable across destinations, with a Destination Pack supplying local language, regulations, sources, supplier networks and emergency details.

## 5. Resolution Engine — the core differentiator
Turn user goal into typed intent, requirements, constraints, plan, tool calls, provider selection, explicit approvals, persisted tasks and evidence of completion. A user can say 'move my family to Phuket for one year' and receive coordinated workstreams for visas, schools, accommodation, insurance, transport and appointments. The engine uses durable workflows with idempotency, deadlines, retries, human handoff and audit. Every action has a named responsible party, evidence, failure state and user-visible progress. A message sent is not an order confirmed; a lead created is not a service fulfilled. Never hallucinate an executed action.

## 6. Knowledge architecture
Four distinct systems:
1. **Verified Knowledge:** operator-approved guides, official documents, laws and local instructions with source, owner, license, locale, date verified, validity, jurisdiction, reviewer and expiration.
2. **Structured Marketplace:** supplier identities, offerings, prices, units, availability, booking conditions, service coverage, credentials and agreements.
3. **Live External Discovery:** Google Maps/Places, permitted search engines, official sites, supplier websites, event organizers, approved Telegram channels/groups and other lawful connectors; link to source and respect caching/usage limits.
4. **Personal Context:** consented preferences, conversations, user documents and tasks, separated from commercial CRM.
Use retrieval augmented generation for narrative knowledge; transactional queries and pricing must come from structured systems or confirmed quotes. Automated ingestion can propose updates; critical claims require source checks and human review. Freshness monitoring, contradiction detection, deduplication, entity matching, provenance, takedown and correction workflows. Never bulk-copy restricted third-party databases.

## 7. Market Search & Supplier Registry
Federated search across own myUNO catalogs, myUNO-final operational inventory where permitted, external providers, maps, authorized Telegram sources, approved APIs and current web pages. Normalize and deduplicate by canonical entity IDs while preserving original links. Label every result **external/unverified**, **verified business**, **partner**, or **live-confirmed offer**. Ranking favors user constraints, verifiable availability, relevance, reliability, total price and quality; sponsorship clearly labeled and never silently overrides relevance. Show source, freshness, price basis and conditions. If no verified inventory exists, show external choices without pretending a booking channel exists.

## 8. Provider onboarding — no website required
Supplier scans QR or visits myUNO Concierge Business, chooses language, speaks about business, uploads pictures/PDF/pricelist or enters website, spreadsheet or API endpoint. AI extracts draft structured offers. Supplier verifies identity/authority, business registration or relevant license where required, contact, location, language, service areas, cancellation terms, lead recipient, price model, availability, fulfillment and commission agreement. Supplier previews and approves publication. Admin review for high-risk or regulated categories. Provider can maintain catalog by voice/text, upload revised prices, receive requests, send quotes, update availability and close orders. Integration tiers: directory listing → verified contact → contracted partner → API-integrated inventory. Supplier is never required to build a website or install an agent runtime.

## 9. Agent-to-business execution
Personal Concierge submits **typed requests** to Business Concierge or provider endpoints, not uncontrolled agent-to-agent free chat. Business assistant can answer using approved inventory, quote policy and schedule; commercial acceptance follows supplier-defined authority. For external providers, offer contact/referral or human concierge, with permission and source disclosure. High-value/complex boats, real estate and regulated services route through human review as appropriate; low-risk repeatable services can use approved automation. Buyer and supplier each receive status updates. Human operator can take over without losing context.

## 10. Commerce and monetization
B2C optional subscription with voice/tool usage allowances; B2B subscription for AI sales desk; onboarding/configuration fees; operator white-label licensing; disclosed referral or commission on completed services; permissible professional referrals; optional paid enterprise integrations. Commission and attribution captured in signed snapshots with source, referral chain, operator, supplier, taxes, payout, refund and dispute. Do not assume commission rights from an external listing. Never promise unlimited AI usage at fixed low price without measured unit economics. Report gross margin after model/API, human labor, payments, support and acquisition.

## 11. Organization graph
Canonical Organization can have Places, Services, Products, Events, Properties, Inventory, Staff, Licenses, Locations, ContactChannels, BookingMethods, AvailabilitySources, Agreements, QualityEvents and Destinations. One organization can be hotel, restaurant, event host and provider simultaneously. Google Place IDs can link to entities subject to provider terms; Google data does not automatically become owned permanent records. Provider claims require ownership verification. Maintain immutable external IDs and source lineage.

## 12. Identity, trust and consent
Account + role + tenant/project scope; guest booking-bound access; suppliers see only their business data; operator access by assigned scope. Anonymous public search; explicit opt-in for personal memory, location, sensitive data, external communications, supplier contact sharing and marketing. Separate personal history from sales CRM. Support export/delete, revocation, retention and auditable access. PDPA and jurisdiction-specific rules; additional safeguards for minors and regulated workflows.

## 13. Integration architecture
Independent **myUNO Concierge** service and database for sessions, conversations, tasks, consent, source mappings and commercial orchestration. **myuno** supplies public catalog via allowlisted API/projections. **myUNO-final** supplies authorized PMS, property, service, tickets and booking operations via scoped APIs. No direct unrestricted cross-database access; no data copying without explicit canonical mapping. External adapters: search/places, events, maps, airline/transport/food/boats booking where authorized, email/calendar, LINE/WhatsApp Business/Telegram subject to platform permissions, payment gateway later, notification services, human desk. Each connector declares permissions, capability level, rate/cost limits, freshness, failure policy and audit. Unsupported integrations fall back to honest referral/human assistance.

## 14. AI architecture & low-cost operation
Model-agnostic gateway with cheapest capable model for classification, FAQ and extraction; stronger model only when necessary. Tool-first retrieval, deterministic computation, cache permitted non-sensitive responses, short prompts, bounded context, token/time/tool ceilings, daily tenant/user budget, throttling, fallback and cost ledger. Voice via pluggable STT/TTS with EN/RU/TH quality testing; text always works. OpenClaw/LiveKit/Pipecat are candidates, not mandatory monoliths. Never deploy one unrestricted shared OpenClaw instance holding all user credentials. Prompt injection defenses, content sanitization, tool allowlists, approval gates and monitoring.

## 15. Experience and design system
Friendly, premium but understated myUNO branding. Voice-first **not voice-only**. Home: clear welcome, mic, text, language switch, contextual shortcuts, urgent help. Task screen: progress, owner, next step, evidence and retry. Results: compact comparable cards with source, date, price, status and CTA. Business screen: inbox, offers, calendar, confirmations, revenue. Staff console: triage, SLAs, escalations, customer consent and resolution. Consistent tokens, accessible contrast, 44px targets, RTL-ready internationalization, skeleton/empty/error states, fast loading and offline emergency contact view. No fake controls or fabricated results.

## 16. Destination platform
Destination Pack defines geography, timezone, currency, languages, regulations, verified knowledge, organizations, emergency services, service categories, local search connectors, provider coverage, operators, content reviewers, compliance rules and launch readiness. Admin workflow: create destination → import permitted sources → onboard providers → verify knowledge → test workflows → enable limited rollout → monitor quality. User's assistant travels with them; location is permission-based and overridable.

## 17. Institutional & regulated workflows
Medical, police, emergency, immigration and legal modules require special policy gates, reviewed sources, explicit limitations, trained human escalation and verified partner arrangements. Direct official emergency calling is never blocked by AI. Translation displays original and target text, uncertainty and confirmation for critical information. No official affiliation, medical diagnosis, legal representation, visa guarantee or automatic filing unless separately authorized and lawful.

## 18. Logical data entities
User, Identity, RoleAssignment, Tenant, Destination, DestinationPack, DomainPack, GuestStayGrant, PersonalMemory, ConsentRecord, Conversation, Message, Task, TaskStep, ToolExecution, Source, KnowledgeArticle, KnowledgeRevision, Organization, Place, ProviderVerification, Offering, InventoryItem, AvailabilitySnapshot, QuoteRequest, QuoteVersion, Order, Booking, ServiceTicket, Assignment, Referral, Attribution, PartnerAgreement, CommissionRule, CommissionLedger, PaymentReference, Event, Notification, AuditEvent, Incident. Reuse existing upstream entities through source mappings rather than duplicating business truth. All financial amounts integer minor units and currency. All writes idempotent and authorized.

## 19. Lifecycle and API principles
Request: captured → clarified → researching → options_ready → awaiting_user_approval → submitted → provider_acknowledged → quoted → accepted → in_progress → fulfilled → closed; alternate rejected/cancelled/expired/failed/escalated. Every transition recorded. Proposed interfaces: search, knowledge, catalog, quotes, request creation, status, approval, provider responses, staff handoff, consent, connectors, costs and analytics. Publish OpenAPI contracts with schemas, error codes, auth and versioning before writes. Integrations can declare capability levels: browse-only, contact, quote, reserve, purchase. No capability claim without tested credentials and provider confirmation.

## 20. Security and reliability
Zero-trust tenant isolation, server-side secrets, least privilege, MFA for staff, signed scoped tokens, rate limiting, audit, encryption, backups, restore tests, observability, dead-letter queues, circuit breakers, retry policies, incident response and kill switches. Independent security testing for cross-tenant data and prompt injection. Measured latency, uptime, speech quality and task completion. Degrade gracefully to text, verified static information or human support.

## 21. KPIs and economics
North star: **verified goals completed per active user**, segmented by destination/domain and net contribution. Funnel: QR→first query→first useful answer→request→supplier acknowledgment→confirmed order→fulfilled→commission collected. Additional: repeat usage, retention, conversion, support time, complaints, failed actions, verified data freshness, provider response SLA, AI cost per goal, gross margin, CAC, LTV, payback and provider churn. Measure actual outcomes, not prompts generated.

## 22. Delivery and rollout
**Vision remains broad; implementation is staged.** Initial controlled pilot: Layantara Villas and approved managed condominiums, guest help, catalog, staff tickets, translation, transfers/boats/flowers. Then provider network, external search, real quotes and transactions, immigration/life processes, broader Phuket adoption, institutions (with contracts), multi-destination rollout. See [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) for execution gates. Do not expand regulated/high-risk capabilities before proof of safety and demand.

## 23. Non-functional acceptance
No fake confirmations; evidence-backed status; complete audit; privacy and tenant isolation; accessible EN/RU/TH; low-bandwidth usability; per-action cost limits; published API contracts; full integration tests; legal review where required; documented operator fallback. Source failures must not silently create fictional results. Production readiness requires deployment, monitoring, backup recovery and signoff.

## 24. Open strategic decisions
Brand trademark and legal entity; monetization priority; target operator and provider contracts; partner commercial rules; model/voice vendor selection; data retention; institutional partnerships; destination licensing; payment processor; localization priorities; liability coverage; public-vs-private source strategy. These are decisions to validate, not gaps AI may invent.

## 25. Founder instruction to developers
**Build toward this complete product architecture without building every feature in the first release.** Do not collapse the long-term platform into a Layantara-only app, nor promise a universal assistant in MVP. Each delivered feature must be genuinely connected, permissioned, measurable, and economically sustainable. Product vision and delivery roadmap are separate sources of truth with distinct purposes.
