# Strategic Product Document: EmissioTrace

## _A Purpose-Built Carbon Lifecycle Compliance Platform for South African Beverage Exporters_

---

## 1. Project Synopsis

### 🎯 The Problem

South African wine and spirits producers face an existential commercial threat: **Systembolaget's transition to mandatory carbon reporting by 2026** will close one of their highest-margin export markets unless they can produce ISO 14067-compliant lifecycle emission data per SKU. Currently, this data is fragmented across:

- **Disconnected grape growers** in Stellenbosch, Paarl, and the Swartland with limited digital infrastructure
- **Bottling and production facilities** tracking energy data in disparate spreadsheets
- **Logistics partners** moving product from Cape Town to Gothenburg with no standardized emission tracking
- **One-off sustainability consultants** charging R150,000–R400,000 per product audit, producing data that becomes stale within 12 months

The chasing process itself is broken — admins send dozens of WhatsApp messages and emails across language barriers (English/Afrikaans/limited literacy among farm workers) to assemble a single product's carbon footprint.

### 💡 The Solution

**EmissioTrace** is a B2B SaaS platform purpose-built for South African beverage exporters that:

1. **Maps** the full upstream supply chain visually (Vineyard → Winery → Bottler → Logistics)
2. **Collects** data through guided wizards designed for non-technical contributors in English and Afrikaans
3. **Calculates** emissions using a curated South African emission factor database (Eskom grid mix, local agricultural factors, ADEME-aligned viticulture data)
4. **Exports** Systembolaget/CarbonCloud-ready reports with a single click
5. **Audits** every data point with full evidence trails for ISO 14067 compliance

### 🚀 The Opportunity

| Market Layer                                                            | Size                     | Strategic Value                      |
| ----------------------------------------------------------------------- | ------------------------ | ------------------------------------ |
| SA wine exporters to Systembolaget                                      | ~80–120 active suppliers | Beachhead market, deep relationships |
| SA wine exporters globally (all Nordic + EU + UK markets)               | ~400+ suppliers          | Year 2 expansion                     |
| SA spirits & craft beer exporters                                       | ~150+ suppliers          | Year 2–3 expansion                   |
| African beverage exporters (Kenya coffee liqueurs, Mauritian rum, etc.) | ~600+ suppliers          | Year 3+ continental play             |

### 🔭 The Vision

> _"To become the default carbon compliance operating system for African beverage exporters — turning a regulatory burden into a competitive trade advantage."_

By owning the South African beverage compliance niche first, EmissioTrace builds defensible domain expertise, methodology credibility, and customer relationships that position it for either a strategic acquisition by a global sustainability platform (Watershed, Persefoni, CarbonCloud) or as the foundation of an African-headquartered sustainability tech champion.

---

## 2. Target Audience Identification

### 🥇 Primary Persona: The Export Sustainability Manager

**"Annika at a Stellenbosch Winery"**

| Attribute               | Detail                                                     |
| ----------------------- | ---------------------------------------------------------- |
| **Role**                | Export Compliance / Sustainability Manager                 |
| **Company Size**        | 15–80 SKUs, R50M–R500M revenue, 30–200 employees           |
| **Location**            | Western Cape (Stellenbosch, Paarl, Franschhoek, Robertson) |
| **Age / Tech Literacy** | 28–45, moderate-to-high digital fluency                    |
| **Languages**           | English primary, Afrikaans secondary                       |
| **Reports To**          | Export Director or MD                                      |

**Pain Points (Priority Order):**

- 🔴 **Catastrophic risk of losing Systembolaget shelf access** = potential 15–35% of annual export revenue
- 🔴 **Chasing data across 10+ external parties in multiple languages**
- 🟠 **Repeated consultant fees** for what should be a repeatable annual process
- 🟠 **No defensible audit trail** when Systembolaget queries a submission
- 🟡 **Reporting fatigue** — same data being requested in different formats by UK, EU, and Nordic buyers

---

### 🥈 Secondary Persona: The Upstream Contributor

**"Pieter the Grape Grower" / "Sipho the Logistics Coordinator"**

| Attribute                | Detail                                                            |
| ------------------------ | ----------------------------------------------------------------- |
| **Role**                 | Vineyard Manager / Bottler Operations Lead / Freight Forwarder    |
| **Tech Profile**         | Mixed — Pieter uses Android in the field; Sipho is desktop-based  |
| **Language**             | Afrikaans-first (rural Western Cape) or English (urban logistics) |
| **Engagement Frequency** | 1–4 times per year, deadline-driven                               |

**Pain Points:**

- 🔴 **Doesn't understand why the data matters to him** — needs business context, not lectures
- 🔴 **Filling complex forms in a second language** is genuinely frustrating
- 🟠 **No incentive to be timely** — currently the winery chases him, not the platform
- 🟠 **Concerned about commercial confidentiality** of yield/volume data

---

### 🥉 Tertiary Persona: The Internal Reviewer / Auditor

**"Lerato the Compliance Officer"**

| Attribute                        | Detail                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| **Role**                         | Internal compliance officer or external sustainability consultant                   |
| **Need**                         | Verify uploaded evidence matches entered data; flag discrepancies; approve sections |
| **Critical Feature Requirement** | Verification badges on output reports; commenting/query workflow                    |

---

## 3. Prioritized MVP Feature List

### Legend

- 🔴 **P0 — Must Have (MVP Launch Blocker)**
- 🟠 **P1 — Should Have (MVP Launch Differentiator)**
- 🟡 **P2 — Could Have (Phase 2, Months 6–12 Post-Launch)**
- 🟢 **P3 — Future Roadmap (Year 2+)**

---

### Module 1: User Management & Supply Chain Setup

| Feature                                               | Priority | Effort | Impact | Notes                                          |
| ----------------------------------------------------- | -------- | ------ | ------ | ---------------------------------------------- |
| Email/password authentication with MFA                | 🔴 P0    | M      | H      | Self-hosted on local SA infrastructure         |
| Role-based access (Admin / Contributor / Reviewer)    | 🔴 P0    | M      | H      | Three-tier permission model                    |
| Visual supply chain builder (drag-drop nodes)         | 🔴 P0    | L      | H      | Differentiator vs. spreadsheet workflows       |
| Contributor invite system with secure tokenized links | 🔴 P0    | M      | H      | Token-scoped to single product per contributor |
| Automated reminder workflow (email + SMS)             | 🟠 P1    | M      | H      | SMS critical for SA rural reach                |
| WhatsApp Business API reminders                       | 🟡 P2    | L      | M      | Highest-engagement channel locally             |
| White-label branding (custom logo/domain)             | 🟢 P3    | L      | M      | Premium tier feature                           |

---

### Module 2: Data Collation Wizards (The 4 Pillars)

| Feature                                               | Priority | Effort | Impact | Notes                                      |
| ----------------------------------------------------- | -------- | ------ | ------ | ------------------------------------------ |
| Cultivation wizard (fertilizer, fuel, yield)          | 🔴 P0    | M      | H      | SA-specific fertilizer brands pre-loaded   |
| Production wizard (Eskom grid + diesel genset hours)  | 🔴 P0    | M      | H      | Load-shedding hours must be capturable     |
| Packaging wizard (glass weight, closures, recycled %) | 🔴 P0    | M      | H      | Dropdown library of SA packaging suppliers |
| Transport wizard (multimodal: truck → port → ship)    | 🔴 P0    | L      | H      | Cape Town → Gothenburg route templates     |
| English/Afrikaans bilingual UI                        | 🟠 P1    | M      | H      | Strategic differentiator                   |
| Mobile-responsive contributor forms                   | 🟠 P1    | M      | H      | Critical for vineyard managers             |
| Offline data entry with sync                          | 🟡 P2    | L      | M      | For low-connectivity rural areas           |
| CSV bulk import for power users                       | 🟡 P2    | M      | M      | For 20+ SKU portfolios                     |

---

### Module 3: Document & Evidence Vault

| Feature                                         | Priority | Effort | Impact | Notes                                          |
| ----------------------------------------------- | -------- | ------ | ------ | ---------------------------------------------- |
| Drag-drop file upload nested in forms           | 🔴 P0    | S      | H      | PDF, JPG, PNG, XLSX support                    |
| AES-256 encrypted document storage              | 🔴 P0    | M      | H      | Self-hosted MinIO or local SA cloud            |
| Full audit trail (who/what/when on every field) | 🔴 P0    | M      | H      | Immutable log for ISO 14067 compliance         |
| Reviewer commenting & query workflow            | 🟠 P1    | M      | H      | Allows internal verification before submission |
| OCR auto-extraction from utility bills          | 🟡 P2    | L      | M      | Reduces contributor burden significantly       |
| Verification badges on documents                | 🟠 P1    | S      | M      | Trust signal in output reports                 |

---

### Module 4: Calculation Engine & Reporting

| Feature                                        | Priority | Effort | Impact | Notes                                              |
| ---------------------------------------------- | -------- | ------ | ------ | -------------------------------------------------- |
| **SA-localized emission factor library** ⭐    | 🔴 P0    | L      | H      | **See Section 3.1 below for recommended approach** |
| Real-time CO₂e calculation per product         | 🔴 P0    | M      | H      | Activity × factor with system boundary logic       |
| Dashboard with 4-pillar contribution breakdown | 🔴 P0    | M      | H      | Visual storytelling for management                 |
| Systembolaget/CarbonCloud CSV export           | 🔴 P0    | M      | H      | Format-matched to current submission gateway       |
| PDF report with verification trail             | 🔴 P0    | M      | H      | Branded, audit-ready output                        |
| Multi-framework export (UK PAS 2050, EU PEF)   | 🟡 P2    | L      | M      | Phase 2 expansion driver                           |
| Year-over-year emission trends                 | 🟡 P2    | M      | M      | Customer retention feature                         |
| Benchmark mode (anonymized peer comparison)    | 🟢 P3    | L      | M      | Network effect feature, requires scale             |

---

### 3.1 ⭐ Emission Factor Database Recommendation for South African Context

You asked for the best approach given the SA context. Here is the recommended hybrid strategy:

| Layer                                             | Source                                                                                                                     | Justification                                                                                              |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Electricity grid emissions**                    | **Eskom's published grid emission factor** (currently ~0.95 kgCO₂e/kWh, updated annually)                                  | Mandatory — SA's coal-heavy grid means using DEFRA averages would materially understate footprints by 60%+ |
| **Diesel/genset emissions (load-shedding)**       | DEFRA combustion factors (universally accepted)                                                                            | Critical SA-specific data point most consultants miss                                                      |
| **Agricultural inputs (fertilizers, pesticides)** | **EcoInvent** (licensed) cross-referenced with **South African Wine Industry Information & Systems (SAWIS)** practice data | Best scientific grounding for SA viticulture                                                               |
| **Packaging (glass, closures, labels)**           | EcoInvent for materials; SA-specific transport additions                                                                   | Most SA glass comes from Consol Glass — region-specific factor available                                   |
| **Ocean freight (Cape Town → Northern Europe)**   | IMO + Clean Cargo Working Group factors                                                                                    | Route-specific calculations more accurate than generic per-tonne-km                                        |
| **Road freight (in-country)**                     | DEFRA HGV factors (SA fleet profile similar to EU)                                                                         | Acceptable proxy until SA-specific data emerges                                                            |

**Strategic Recommendation:** Build a proprietary "**EmissioTrace Factor Library v1.0**" that combines licensed EcoInvent core data with publicly available SA-specific factors and your consultancy's curated dataset. Position this as a **methodological moat** — a defensible asset other generic platforms cannot replicate without years of regional work. Pursue endorsement from **SAWIS** or **WWF-SA's Conservation Champions** programme as a credibility multiplier.

---

## 4. Infrastructure Architecture (Self-Hosted SA-Local Approach)

Given your preference for local infrastructure with self-hosted services, here is the recommended stack:

| Layer              | Recommended Choice                                                                  | Rationale                                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Hosting**        | **Teraco data centres** (Cape Town or Johannesburg)                                 | Tier III+ certified; SA's leading carrier-neutral facility; meets data residency expectations of EU buyers under GDPR via SCCs |
| **Compute**        | Self-hosted Kubernetes (k3s) on dedicated bare metal                                | Cost-efficient at projected scale; full control                                                                                |
| **Database**       | PostgreSQL (self-hosted, encrypted at rest)                                         | Mature, well-understood, supports row-level security for tenant isolation                                                      |
| **Object Storage** | MinIO (S3-compatible, self-hosted)                                                  | Documents stored encrypted with per-tenant keys                                                                                |
| **Backup/DR**      | Cross-region replication to a second SA data centre (e.g., Teraco JHB → Teraco CPT) | Tier II disaster recovery posture                                                                                              |
| **Email/SMS**      | Mailgun (transactional) + Clickatell (SMS for SA reach)                             | Both have strong SA presence                                                                                                   |
| **Monitoring**     | Grafana + Prometheus (self-hosted)                                                  | Standard open-source stack                                                                                                     |
| **CI/CD**          | GitLab self-hosted or GitHub Actions                                                | Founder preference                                                                                                             |

**Strategic Caveat:** Self-hosting in SA gives strong cost economics and data sovereignty messaging but **carries an operational burden risk**. Recommend hiring or contracting a dedicated DevOps engineer from Month 2 of build to avoid uptime issues that would damage early customer trust. Budget approximately **R35,000–R50,000/month** for infrastructure + DevOps support during MVP phase.

---

## 5. Monetization Pathways & Revenue Projections

### Primary Model: Per-SKU Annual Subscription

| Tier           | SKU Range              | Annual Price (EUR)  | Annual Price (ZAR ~R20/€) | Target Customer                               |
| -------------- | ---------------------- | ------------------- | ------------------------- | --------------------------------------------- |
| **Starter**    | 1–5 SKUs               | €1,200              | R24,000                   | Small boutique winery / craft distillery      |
| **Growth**     | 6–20 SKUs              | €3,600              | R72,000                   | Mid-sized winery (your pilot partner profile) |
| **Scale**      | 21–50 SKUs             | €7,800              | R156,000                  | Large established exporter                    |
| **Enterprise** | 50+ SKUs / white-label | Custom from €15,000 | From R300,000             | Major export houses, co-ops                   |

### Secondary Revenue Streams

| Stream                              | Description                                                              | Year 1 Contribution | Year 3 Contribution |
| ----------------------------------- | ------------------------------------------------------------------------ | ------------------- | ------------------- |
| **Onboarding & Migration Services** | One-time fee R15K–R45K to set up supply chain & migrate historical data  | 25%                 | 10%                 |
| **Consultancy Add-On**              | Optional human review of submissions, leveraging existing consultancy IP | 20%                 | 8%                  |
| **Multi-Framework Reporting**       | Premium unlock for UK PAS 2050, EU PEF, CDP integration                  | 0% (Year 2+)        | 12%                 |
| **Methodology Licensing**           | License "EmissioTrace Factor Library" to consultancies                   | 0% (Year 3+)        | 5%                  |

---

### 📊 3-Year Revenue Projection

**Assumptions:**

- 80 active SA wine suppliers to Systembolaget = beachhead TAM
- 400 SA beverage exporters globally = expansion TAM
- Year 1: 60% Starter, 30% Growth, 10% Scale tier mix
- Customer churn assumed at 8% annually (high regulatory stickiness)
- Avg revenue per customer (ARPU) evolves as customers add SKUs

| Metric                                      | Year 1      | Year 2       | Year 3       |
| ------------------------------------------- | ----------- | ------------ | ------------ |
| **New Customers Acquired**                  | 15          | 35           | 55           |
| **Cumulative Active Customers**             | 15          | 47           | 98           |
| **Avg Revenue Per Customer (€)**            | €2,800      | €3,400       | €4,200       |
| **Subscription Revenue (€)**                | €42,000     | €159,800     | €411,600     |
| **Services & Add-On Revenue (€)**           | €14,000     | €48,000      | €98,000      |
| **TOTAL ANNUAL REVENUE (€)**                | **€56,000** | **€207,800** | **€509,600** |
| **TOTAL ANNUAL REVENUE (R)**                | **~R1.12M** | **~R4.16M**  | **~R10.19M** |
| **Monthly Recurring Revenue (end of year)** | ~€3,500     | ~€13,300     | ~€34,300     |

### 📈 Revenue Trajectory Visualization

```
Year 3 ████████████████████████████████████████████████  €509,600
Year 2 ████████████████████                              €207,800
Year 1 █████                                             €56,000
```

### 📊 Year 3 Revenue Mix

```
Subscriptions      ████████████████████████████████░░░░  80.8%  (€411,600)
Services/Add-Ons   ███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  19.2%  (€98,000)
```

### 🎯 Path to €25K MRR Validation Milestone

Based on the model, **€25K MRR is achieved approximately Month 28–30**, which is consistent with your stated success criteria. This is a realistic trajectory **assuming**:

- Pilot conversion to paid by Month 6
- 2–3 new customers per month from Month 9 onward
- Word-of-mouth from your existing consultancy network drives 60%+ of Year 1 deals

---

## 6. User Story Map: MVP Sprint-Ready

### Backbone (User Journey Stages)

```
┌────────────┬─────────────┬──────────────┬─────────────┬──────────────┐
│ ONBOARD    │ MAP CHAIN   │ COLLECT DATA │ REVIEW      │ EXPORT       │
└────────────┴─────────────┴──────────────┴─────────────┴──────────────┘
```

### Walking Skeleton (Minimum Releasable MVP)

| Stage            | Admin Story                                                          | Contributor Story                                                 | Reviewer Story                                                       |
| ---------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Onboard**      | "As an Admin I can register my company and add my product portfolio" | "As a Contributor I receive an invite link and create a password" | "As a Reviewer I am added by the Admin and access assigned products" |
| **Map Chain**    | "As an Admin I can build a visual supply chain for each product"     | —                                                                 | —                                                                    |
| **Collect Data** | "As an Admin I assign each chain node to a Contributor"              | "As a Contributor I complete a guided wizard for my section"      | —                                                                    |
| **Review**       | "As an Admin I see real-time completion status across all products"  | "As a Contributor I upload evidence files for each data point"    | "As a Reviewer I verify entries and raise queries on discrepancies"  |
| **Export**       | "As an Admin I generate a Systembolaget-ready PDF + CSV export"      | —                                                                 | "As a Reviewer I approve a section and apply a verification badge"   |

### Recommended Sprint Sequencing (16-Week MVP Build)

| Sprint  | Weeks     | Focus                                         | Deliverable                                      |
| ------- | --------- | --------------------------------------------- | ------------------------------------------------ |
| **0**   | Pre-build | Architecture & infra setup                    | Teraco hosting live, k3s cluster, base DB schema |
| **1–2** | 1–4       | Auth + Multi-tenancy + Roles                  | Admin/Contributor/Reviewer login working         |
| **3–4** | 5–8       | Supply Chain Builder + Invites                | Admin can map and invite contributors            |
| **5–6** | 9–12      | Data Wizards (all 4 pillars) + Evidence Vault | Contributors can submit complete data            |
| **7**   | 13–14     | Calculation Engine + SA Factor Library v1     | Real CO₂e numbers per product                    |
| **8**   | 15–16     | Export + Dashboard + Polish                   | Systembolaget-ready outputs                      |

**Recommendation:** Plan a **Week 17–18 buffer** for pilot partner UAT (User Acceptance Testing) before any paid launch.

---

## 7. Risk Register & Mitigation

| Risk                                                                                    | Likelihood | Impact | Mitigation Strategy                                                                                                                                                       |
| --------------------------------------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pilot partner contributor adoption fails** (the 68-year-old vineyard manager problem) | HIGH       | HIGH   | Invest disproportionately in contributor UX. Conduct 3 in-field usability tests in Stellenbosch before Sprint 5. Consider voice-note alternatives for low-literacy users. |
| **Systembolaget changes submission format mid-build**                                   | MEDIUM     | HIGH   | Build export layer as configurable templates, not hardcoded. Maintain direct line to CarbonCloud team for format change advance warning.                                  |
| **Eskom grid factor methodology dispute**                                               | LOW        | MEDIUM | Publish a transparent methodology whitepaper. Get sign-off from SAWIS or an academic partner (Stellenbosch University) early.                                             |
| **Self-hosted infrastructure downtime damages early trust**                             | MEDIUM     | HIGH   | Hire dedicated DevOps from Month 2. Maintain hot standby in second Teraco region. Publish public status page.                                                             |
| **Large competitor (CarbonCloud, Watershed) launches SA-focused offering**              | MEDIUM     | HIGH   | Move fast. Build deep SA wine industry relationships. The methodological moat (SA factor library) + local price point are your defenses.                                  |
| **Currency volatility (ZAR/EUR)**                                                       | HIGH       | MEDIUM | Price contracts in EUR for international customers; ZAR for purely domestic. Hedge naturally through dual pricing.                                                        |

---

## 8. Strategic Recommendations & Next Steps

### Immediate Actions (Next 30 Days)

1. ✅ **Convert the SA wine pilot partner into a formal Design Partner Agreement** with 6 months free access in exchange for weekly feedback sessions and the right to use them as a launch case study
2. ✅ **Engage SAWIS** about methodological partnership — their endorsement is worth 6 months of marketing
3. ✅ **Secure Teraco hosting contract** and provision base infrastructure
4. ✅ **Hire or contract a senior full-stack engineer + part-time DevOps** to begin Sprint 0
5. ✅ **Draft the "EmissioTrace Factor Library v1.0" methodology document** — this becomes both a product asset and a marketing asset

### Strategic Bets to Validate in Year 1

- 🎯 **Can pilot contributor adoption exceed 80% completion rate?** This is the single most important leading indicator of business viability.
- 🎯 **Will SA wine suppliers pay €2,400+ ARPU upfront annually?** Stated willingness in conversation is not the same as a signed contract.
- 🎯 **Does the Systembolaget export format remain stable enough to build automation around?**

### Long-Term Strategic Vision

By Year 3, EmissioTrace should be positioned not just as a software product but as **"the operating system for African beverage compliance"** — a credible acquisition target for global sustainability platforms looking to enter Africa, or a foundation for a continental expansion play into Kenya, Mauritius, and Ghana's emerging spirits export markets.

The deliberate niche focus on alcohol + South African geographic depth creates a defensible moat. **Stay narrow until you're impossible to ignore.**

---
