# Pilot implementation plan

Target: Layantara Villas and a small set of managed condominium units. Product: standalone myUNO Concierge PWA, not a replacement for myuno or myUNO-final.

1. Validate pilot property identifiers and operator approval.
2. Build guest authentication via booking-bound, expiring invite or verified login.
3. Read published services via a server-side, scoped adapter.
4. Implement ticket and service request workflows with idempotency, confirmation, audit and staff ownership.
5. Add cost-limited voice transcription and translation in RU/EN/TH; text fallback always available.
6. Add market search with source links and unconfirmed-availability labels.
7. Test guest isolation, role permissions, abuse protection and operational handover.
8. Deploy to staging, test with staff, then controlled QR rollout.

Acceptance: a verified guest can create a real request, staff receives it, staff confirms, guest sees status. Anonymous user cannot view private stay data. No action claims success without provider or backend confirmation.
