# AGENT HANDOFF — Read first
Product: **myUNO Concierge**, not MALI. Repo: **pavel949/myUNO-concierge**.
Upstream **pavel949/myuno** = public site/catalog; **pavel949/myUNO-final** = PMS/operations. They are separate systems and databases. No writes to either without explicit authorization.
Full product vision: [ULTIMATE_PRODUCT_PRD.md](ULTIMATE_PRODUCT_PRD.md). Pilot requirements: [MASTER_PRD.md](MASTER_PRD.md). Ordered delivery: [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md).
Current repo is a prototype. Browser speech input and local demo requests are not a working AI agent or production tickets. Catalog adapters are unverified against deployed endpoints.
**Immediate next task:** Phase 0: inspect build, add tests/CI and env documentation; then validate Phase 1 public catalog contract in staging. Never invent URL/keys or claim live connection.
Always: use PRs for risky changes, do not overwrite existing production code, do not add secrets, obtain approval for spending, do not deploy publicly without security gate. Report verified facts, failures and blockers.
Architecture: single UI assistant → scoped orchestration → replaceable tools → two read-only public catalogs → authorized ticket/commerce adapters. Guest QR ≠ identity. No cross-tenant leakage.
