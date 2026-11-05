# myUNO Concierge

Standalone guest concierge pilot for Layantara Villas and managed condominiums.

## Start here (humans and AI agents)
1. [Ultimate Product PRD — full end-state vision](docs/ULTIMATE_PRODUCT_PRD.md)
2. [Pilot scope and requirements](docs/MASTER_PRD.md)
3. [Implementation phases and release gates](docs/IMPLEMENTATION_ROADMAP.md)
4. [Mandatory AI agent handoff](docs/AGENT_HANDOFF.md)
5. [Catalog adapter setup](docs/CATALOG_CONNECTORS.md)
6. [Integration audit](docs/INTEGRATION_AUDIT.md)

## Current status
**Prototype only.** Mobile UI and read-only catalog adapter code are committed. Production connectivity, guest identity, live requests, real AI and deployment have not been verified.

## Local UI
`npm install && npm run dev`. Serverless `api/catalog.js` runs on a compatible deployment runtime, not plain Vite dev server.

## Repository boundaries
`myuno` and `myUNO-final` are separate upstream systems. Do not edit them or copy their private data as part of this pilot.
