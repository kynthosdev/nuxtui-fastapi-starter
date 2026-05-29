# Project Brief: EmissioTrace

## Executive Summary

**EmissioTrace** is a B2B SaaS platform purpose-built for South African beverage exporters facing mandatory carbon reporting requirements for the Systembolaget market by 2026.

### Vision Statement

> _"To become the default carbon compliance operating system for African beverage exporters — turning a regulatory burden into a competitive trade advantage."_

### Mission

Enable South African wine and spirits producers to produce ISO 14067-compliant lifecycle emission data per SKU through a guided, localized platform that maps supply chains, collects data from non-technical contributors, calculates emissions using SA-specific factors, and exports audit-ready reports.

---

## Business Context

### The Problem

South African wine and spirits producers face an existential commercial threat: **Systembolaget's transition to mandatory carbon reporting by 2026** will close one of their highest-margin export markets unless they can produce ISO 14067-compliant lifecycle emission data per SKU.

**Current Pain Points:**

- Data fragmented across disconnected grape growers, bottling facilities, and logistics partners
- Chasing process broken — admins send dozens of WhatsApp messages across language barriers
- One-off sustainability consultants charging R150,000–R400,000 per product audit
- No defensible audit trail for ISO 14067 compliance

### The Solution

A purpose-built platform that:

1. **Maps** the full upstream supply chain visually (Vineyard → Winery → Bottler → Logistics)
2. **Collects** data through guided wizards in English and Afrikaans
3. **Calculates** emissions using a curated South African emission factor database
4. **Exports** Systembolaget/CarbonCloud-ready reports with a single click
5. **Audits** every data point with full evidence trails

---

## Scope & Objectives

### MVP Scope (Months 0-4)

**Core Hypothesis:** South African beverage exporters will pay €1,200–€7,800 annually to automate carbon compliance reporting if the platform achieves >80% contributor completion rates.

**MVP Launch Criteria:**

- [ ] Visual supply chain builder with drag-drop nodes
- [ ] Contributor invite system with tokenized links
- [ ] 4-pillar data collection wizards (Cultivation, Production, Packaging, Transport)
- [ ] SA-localized emission factor library v1.0
- [ ] Real-time CO₂e calculation per product
- [ ] Systembolaget/CarbonCloud CSV export
- [ ] PDF report with verification trail
- [ ] Full audit trail (ISO 14067 compliance)
- [ ] Role-based access (Admin / Contributor / Reviewer)

### Post-MVP Scope (Months 6-12)

- WhatsApp Business API reminders
- OCR auto-extraction from utility bills
- Multi-framework export (UK PAS 2050, EU PEF)
- Year-over-year emission trends
- CSV bulk import for power users

---

## Target Market & Opportunity

### Beachhead Market (Year 1)

| Segment                            | Size                     | Strategic Value                      |
| ---------------------------------- | ------------------------ | ------------------------------------ |
| SA wine exporters to Systembolaget | ~80–120 active suppliers | Beachhead market, deep relationships |

### Expansion Markets (Year 2-3)

| Segment                                       | Size            | Timeline |
| --------------------------------------------- | --------------- | -------- |
| SA wine exporters globally (Nordic + EU + UK) | ~400+ suppliers | Year 2   |
| SA spirits & craft beer exporters             | ~150+ suppliers | Year 2–3 |
| African beverage exporters                    | ~600+ suppliers | Year 3+  |

---

## Success Metrics & KPIs

### Primary Metrics (North Star)

- **€25K MRR by Month 30** (validation milestone)
- **>80% contributor completion rate** (viability indicator)
- **15+ paying customers by Month 12** (market traction)

### Secondary Metrics

- Customer acquisition cost (CAC) < €2,000
- Annual churn rate < 8%
- Average revenue per customer (ARPU) growth > 20% YoY
- Time to complete product footprint < 30 days (from >90 days manual)

### 3-Year Revenue Targets

| Year | Customers | ARPU (€) | Total Revenue (€) |
| ---- | --------- | -------- | ----------------- |
| 1    | 15        | €2,800   | €56,000           |
| 2    | 47        | €3,400   | €207,800          |
| 3    | 98        | €4,200   | €509,600          |

---

## Key Assumptions & Risks

### Critical Assumptions

1. Systembolaget format remains stable through 2026
2. SA wine suppliers will pay €2,400+ ARPU annually
3. Contributor adoption can exceed 80% completion rate
4. Eskom grid factor methodology will gain industry acceptance

### Top Risks

| Risk                                   | Likelihood | Impact | Mitigation                                              |
| -------------------------------------- | ---------- | ------ | ------------------------------------------------------- |
| Pilot contributor adoption fails       | HIGH       | HIGH   | Invest in contributor UX; conduct field usability tests |
| Systembolaget changes format mid-build | MEDIUM     | HIGH   | Build configurable export templates                     |
| Self-hosted infrastructure downtime    | MEDIUM     | HIGH   | Hire dedicated DevOps; maintain hot standby             |
| Large competitor launches SA offering  | MEDIUM     | HIGH   | Move fast; build methodological moat                    |

---

## Strategic Differentiators

### Methodological Moat

**EmissioTrace Factor Library v1.0** — A proprietary, SA-localized emission factor database combining:

- Eskom grid emission factor (~0.95 kgCO₂e/kWh)
- Licensed EcoInvent data cross-referenced with SAWIS practice data
- DEFRA combustion factors for diesel/genset (load-shedding hours)
- Route-specific ocean freight calculations (Cape Town → Northern Europe)

### Product Differentiators

- Visual supply chain builder (vs. spreadsheet workflows)
- English/Afrikaans bilingual UI
- Mobile-responsive contributor forms
- Automated reminder workflow (email + SMS)
- Full audit trail with immutable logs

---

## Timeline & Milestones

### MVP Launch Timeline (16-Week Build + 2-Week Buffer)

| Milestone                            | Target Date | Success Criteria                                 |
| ------------------------------------ | ----------- | ------------------------------------------------ |
| Sprint 0: Architecture & infra setup | Week 0      | Teraco hosting live, k3s cluster, base DB schema |
| Sprint 1-2: Auth + Multi-tenancy     | Week 4      | Admin/Contributor/Reviewer login working         |
| Sprint 3-4: Supply Chain Builder     | Week 8      | Admin can map and invite contributors            |
| Sprint 5-6: Data Wizards + Vault     | Week 12     | Contributors can submit complete data            |
| Sprint 7: Calculation Engine         | Week 14     | Real CO₂e numbers per product                    |
| Sprint 8: Export + Dashboard         | Week 16     | Systembolaget-ready outputs                      |
| Pilot UAT                            | Week 18     | 3+ pilot partners actively using platform        |

### Revenue Milestones

- **Month 6:** First paying customer (pilot conversion)
- **Month 12:** 15 customers, €3,500 MRR
- **Month 18:** 30 customers, €10,000 MRR
- **Month 28-30:** 50+ customers, €25,000 MRR (validation)

---

## Team & Resource Requirements

### Immediate Hires (Next 30 Days)

1. **Senior Full-Stack Engineer** — Lead MVP development
2. **Part-Time DevOps Engineer** — Infrastructure setup and maintenance
3. **UX Designer** (Contract) — Contributor workflow optimization

### Budget Requirements (MVP Phase)

- Infrastructure (Teraco): ~R35,000–R50,000/month
- Personnel: ~R150,000–R250,000/month
- Software Licenses (EcoInvent): ~€5,000 one-time
- Total MVP Burn: ~R2.5M–R4M for 4-month build

---

## Next Steps (Immediate Actions)

### Next 30 Days

1. ✅ Convert SA wine pilot partner into formal Design Partner Agreement
2. ✅ Engage SAWIS about methodological partnership
3. ✅ Secure Teraco hosting contract and provision base infrastructure
4. ✅ Hire senior full-stack engineer + part-time DevOps
5. ✅ Draft "EmissioTrace Factor Library v1.0" methodology document

### Validation Criteria (Month 6)

- [ ] 3+ pilot partners actively using platform
- [ ] > 80% contributor completion rate achieved
- [ ] First paid conversion from pilot group
- [ ] Systembolaget-format export validated by external auditor

---

## Document History

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Post-MVP Launch (Month 6)
