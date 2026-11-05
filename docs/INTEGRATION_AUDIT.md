# Integration audit — 2026-11-05

## Verified in repository source

- myUNO-final GET /api/services lists public vetted marketplace services.
- myUNO-final GET/POST /api/tickets requires authenticated identity; ticket creation verifies guest/booking or property role.
- myuno has public_service_catalog and list_services read-only MCP tool.
- myuno has concierge-intent and concierge-route functions, primarily route suggestions rather than task execution.

## Not verified

Production deployment, database records, guest authorization interoperability, endpoint connectivity, external provider availability, and production write paths.

## Proposed adapter contracts

- GET /api/concierge/catalog?destination=phuket&projectId=... : public services from allowed sources.
- POST /api/concierge/requests : authenticated or verified guest request; idempotency key; consent; status pending_review.
- GET /api/concierge/requests/:id : only request owner or authorized staff.

Never expose service credentials to the browser. Do not directly write to either existing database. Do not treat anonymous QR scans as proof of a guest's booking.
