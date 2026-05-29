# Active Context: EmissioTrace

## Current Sprint Priorities & Focus (Month 0-1)

### Sprint 0: Architecture & Infrastructure Setup (Weeks 0-2)

**Primary Goals:**

1. **Teraco Hosting Setup** — Provision k3s cluster on Teraco Cape Town data centre.
2. **Base Infrastructure** — Deploy PostgreSQL, Redis, MinIO containers via Docker Compose (dev) and k3s manifests (staging).
3. **CI/CD Pipeline** — Set up GitLab self-hosted or GitHub Actions with automated testing and Docker image builds.
4. **Database Schema** — Define initial SQLAlchemy models and run Alembic migrations for core tables (tenants, users, products, supply_chains, nodes, submissions, audit_logs, factor_library).

**Current Tasks (Ordered by Priority):**

- [ ] Provision Teraco account and set up k3s cluster (Month 0, Week 1)
- [ ] Create Docker Compose files for local development (Month 0, Week 1)
- [ ] Define Pydantic schemas for all API endpoints (Month 0, Week 2)
- [ ] Implement FastAPI authentication endpoints (register, login, MFA) (Month 0, Week 2)
- [ ] Set up PostgreSQL with Row-Level Security policies (Month 0, Week 2)
- [ ] Create MinIO bucket for document storage with encryption (Month 0, Week 2)
- [ ] Write unit tests for authentication flow (Month 0, Week 2)

**Current Blocker:**

- Need to license EcoInvent database (€5,000 one-time) to populate factor_library table. This is required before Sprint 5-6 (Data Wizards) can be completed.

---

## Critical Implementation Decisions (Recorded Here)

### Decision 1: Monorepo Structure

**Date:** 2026-05-28  
**Context:** Need to manage frontend (Nuxt 3) and backend (FastAPI) codebases.  
**Decision:** Use monorepo at root with `/api` (FastAPI) and `/app` (Nuxt 3) directories. Shared TypeScript interfaces in `/shared/types`.  
**Rationale:** Simplifies CI/CD, ensures API and frontend are versioned together.  
**Tradeoff:** Slightly more complex local setup (two package.json/pyproject.toml).

### Decision 2: Celery for Background Tasks (Not FastAPI BackgroundTasks)

**Date:** 2026-05-28  
**Context:** Need to handle long-running tasks (CSV export, PDF generation, reminder emails).  
**Decision:** Use Celery with Redis broker, not FastAPI's `BackgroundTasks`.  
**Rationale:** Celery supports task retries, scheduling (Beat), and horizontal scaling. FastAPI BackgroundTasks are ephemeral and tied to request lifecycle.  
**Tradeoff:** Additional infrastructure component (Redis + Celery workers).

### Decision 3: Nuxt UI v3 for Frontend Component Library

**Date:** 2026-05-28  
**Context:** Need pre-built, accessible components for wizards, dashboards, and forms.  
**Decision:** Use Nuxt UI v3 (Vue 3 ecosystem) rather than building custom components.  
**Rationale:** Faster development, consistent design system, built-in accessibility (WCAG 2.1 AA).  
**Tradeoff:** Slight learning curve for team unfamiliar with Nuxt UI; customization limited to theming.

### Decision 4: PostgreSQL JSONB for Wizard Data & Supply Chain Nodes

**Date:** 2026-05-28  
**Context:** Wizard data (4-pillar) and supply chain nodes (drag-drop config) have variable structure.  
**Decision:** Store as JSONB columns in PostgreSQL, not EAV (Entity-Attribute-Value) model.  
**Rationale:** Simpler queries, native JSONB support in PostgreSQL, easy to evolve schema.  
**Tradeoff:** Less strict schema validation at DB level (mitigated with Pydantic validation in API).

---

## Technical Debt Register

| Debt Item                                    | Impact | Likelihood | Mitigation Plan                                     | Status    |
| -------------------------------------------- | ------ | ---------- | --------------------------------------------------- | --------- |
| **No automated DB migration tests**          | MEDIUM | HIGH       | Add pytest-alembic to verify migrations in CI       | 🔴 Open   |
| **EcoInvent factor import is manual script** | LOW    | MEDIUM     | Build admin UI to upload new factor versions        | 🟡 Future |
| **MinIO bucket replication not automated**   | MEDIUM | LOW        | Add CronJob to sync buckets daily                   | 🟡 Future |
| **No end-to-end tests for wizard flow**      | HIGH   | HIGH       | Implement Playwright E2E tests in Sprint 6          | 🔴 Open   |
| **Rate limiting uses simple Redis counter**  | LOW    | MEDIUM     | Replace with proper library (e.g., fastapi-limiter) | 🟡 Future |
| **Audit log table can grow unbounded**       | MEDIUM | MEDIUM     | Implement yearly partitioning + archival            | 🟡 Future |

---

## Risk Assessment Matrix (Updated)

| Risk                                                  | Likelihood | Impact | Current Mitigation                                                                | Owner        |
| ----------------------------------------------------- | ---------- | ------ | --------------------------------------------------------------------------------- | ------------ |
| **Pilot contributor adoption fails**                  | HIGH       | HIGH   | Invest in contributor UX; 3 in-field usability tests before Sprint 5              | Product Team |
| **Systembolaget changes submission format mid-build** | MEDIUM     | HIGH   | Build export layer as configurable templates (not hardcoded)                      | Tech Lead    |
| **Eskom grid factor methodology dispute**             | LOW        | MEDIUM | Publish transparent methodology whitepaper; get SAWIS sign-off                    | Founder      |
| **Self-hosted infrastructure downtime**               | MEDIUM     | HIGH   | Hire dedicated DevOps from Month 2; maintain hot standby in second Teraco region  | DevOps       |
| **Large competitor launches SA-specific offering**    | MEDIUM     | HIGH   | Move fast; build deep SA wine industry relationships; methodological moat         | Founder      |
| **Currency volatility (ZAR/EUR)**                     | HIGH       | MEDIUM | Price contracts in EUR for international customers; ZAR for domestic              | Finance      |
| **EcoInvent license delays**                          | MEDIUM     | HIGH   | Start process immediately; use DEFRA defaults as temporary fallback               | Tech Lead    |
| **Key developer leaves during MVP build**             | LOW        | HIGH   | Document all architecture decisions; pair programming; knowledge sharing sessions | Tech Lead    |

---

## Sprint Sequencing (16-Week MVP Build)

| Sprint  | Weeks     | Focus                                         | Deliverable                                      | Status         |
| ------- | --------- | --------------------------------------------- | ------------------------------------------------ | -------------- |
| **0**   | Pre-build | Architecture & infra setup                    | Teraco hosting live, k3s cluster, base DB schema | 🔴 In Progress |
| **1–2** | 1–4       | Auth + Multi-tenancy + Roles                  | Admin/Contributor/Reviewer login working         | ⚪ Pending     |
| **3–4** | 5–8       | Supply Chain Builder + Invites                | Admin can map and invite contributors            | ⚪ Pending     |
| **5–6** | 9–12      | Data Wizards (all 4 pillars) + Evidence Vault | Contributors can submit complete data            | ⚪ Pending     |
| **7**   | 13–14     | Calculation Engine + SA Factor Library v1     | Real CO₂e numbers per product                    | ⚪ Pending     |
| **8**   | 15–16     | Export + Dashboard + Polish                   | Systembolaget-ready outputs                      | ⚪ Pending     |
| **UAT** | 17–18     | Pilot partner UAT                             | 3+ pilot partners actively using platform        | ⚪ Pending     |

**Recommendation:** Plan a **Week 17–18 buffer** for pilot partner UAT before any paid launch.

---

## Immediate Actions (Next 30 Days)

1. ✅ **Convert the SA wine pilot partner into a formal Design Partner Agreement** with 6 months free access in exchange for weekly feedback sessions and the right to use them as a launch case study.
2. ✅ **Engage SAWIS** about methodological partnership — their endorsement is worth 6 months of marketing.
3. ✅ **Secure Teraco hosting contract** and provision base infrastructure.
4. ✅ **Hire or contract a senior full-stack engineer + part-time DevOps** to begin Sprint 0.
5. ✅ **Draft the "EmissioTrace Factor Library v1.0" methodology document** — this becomes both a product asset and a marketing asset.

**Status:** All 5 actions are marked complete ✅ in PRD. Now entering execution phase.

---

## Open Questions & Dependencies

| Question                                                          | Depends On                              | Resolution Path                                                          |
| ----------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| **Should we implement offline mode (PWA) in MVP or Phase 2?**     | User research with rural contributors   | Defer to Phase 2 (P2) given Effort: L, Impact: M                         |
| **What is the exact CSV column specification for Systembolaget?** | CarbonCloud/Systembolaget documentation | Request sample export from pilot partner; validate with CarbonCloud team |
| **Which Afrikaans translations take priority?**                   | User testing with Pieter-type personas  | Focus on wizard labels and help text first; UI chrome second             |
| **Should we use WebSockets for real-time dashboard or polling?**  | Frontend performance testing            | Start with polling (30-second interval); upgrade to WebSockets if needed |

---

## Current Team & Responsibilities

| Role                           | Name (Placeholder)           | Responsibility                                            | Allocation |
| ------------------------------ | ---------------------------- | --------------------------------------------------------- | ---------- |
| **Founder/Product**            | (Pending)                    | Vision, SAWIS partnership, pilot recruitment              | 100%       |
| **Senior Full-Stack Engineer** | (To Hire)                    | FastAPI + Nuxt 3 implementation, architecture             | 100%       |
| **Part-Time DevOps Engineer**  | (To Hire, Month 2)           | k3s, Teraco, CI/CD, monitoring                            | 50%        |
| **UX Designer (Contract)**     | (To Hire)                    | Contributor wizard optimization, mobile-responsive design | 30%        |
| **Sustainability Consultant**  | (Founder's existing network) | Factor library curation, methodology whitepaper           | 10%        |

---

## Document History

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Weekly during Sprint 0 (Every Friday)
