# Product Context: EmissioTrace

## Market Analysis

### Competitive Landscape Differentiation

**Direct Competitors:**
| Competitor | Strengths | Weaknesses | EmissioTrace Advantage |
|------------|-----------|------------|------------------------|
| **CarbonCloud** | Established Systembolaget integration | Generic platform, no SA-specific factors | SA-localized factors + bilingual UI |
| **Watershed** | Strong VC backing, enterprise features | Expensive, US-focused | 60-70% lower price point for SA SMEs |
| **Persefoni** | Robust calculation engine | Complex onboarding, consultant-led | Guided wizards designed for non-technical users |
| **One-off Consultants** | Deep domain expertise | Not scalable, data stale in 12 months | Repeatable, always-current platform |

**Indirect Competitors:**

- Spreadsheet-based internal tracking (current state for many)
- Generic LCA tools (SimaPro, OpenLCA) - too technical for SME users

### Market Positioning

EmissioTrace occupies a **niche vertical position**:

- **Geographic Focus:** South African beverage exporters (deep domain expertise)
- **Regulatory Focus:** Systembolaget compliance (ISO 14067)
- **User Focus:** Non-technical contributors (Afrikaans/English bilingual)

This narrow focus creates a **methodological moat** that generic platforms cannot easily replicate.

---

## User Personas

### 🥇 Primary Persona: Export Sustainability Manager

**"Annika at a Stellenbosch Winery"**

| Attribute               | Detail                                                     |
| ----------------------- | ---------------------------------------------------------- |
| **Role**                | Export Compliance / Sustainability Manager                 |
| **Company Size**        | 15–80 SKUs, R50M–R500M revenue, 30–200 employees           |
| **Location**            | Western Cape (Stellenbosch, Paarl, Franschhoek, Robertson) |
| **Age / Tech Literacy** | 28–45, moderate-to-high digital fluency                    |
| **Languages**           | English primary, Afrikaans secondary                       |
| **Reports To**          | Export Director or MD                                      |

**Jobs-to-be-Done (JTBD):**

- **Functional:** "When Systembolaget requests carbon data, I want to produce ISO 14067-compliant reports quickly so that I don't lose 15-35% of export revenue."
- **Emotional:** "I want to feel confident that our data is defensible during audits so that I can sleep at night."
- **Social:** "I want to be seen as a sustainability leader in the industry so that I can attract premium buyers."

**Pain Points (Priority Order):**

1. 🔴 **Catastrophic risk of losing Systembolaget shelf access** = potential 15–35% of annual export revenue
2. 🔴 **Chasing data across 10+ external parties in multiple languages**
3. 🟠 **Repeated consultant fees** for what should be a repeatable annual process
4. 🟠 **No defensible audit trail** when Systembolaget queries a submission
5. 🟡 **Reporting fatigue** — same data being requested in different formats by UK, EU, and Nordic buyers

**Edge Case Scenarios:**

- Contributor ignores invites for 3+ weeks (requires SMS/WhatsApp escalation)
- Contributor submits incomplete data (requires validation flags)
- Systembolaget changes format mid-year (requires configurable export templates)
- Multiple SKUs share same supply chain (requires supply chain templating)

---

### 🥈 Secondary Persona: Upstream Contributor

**"Pieter the Grape Grower" / "Sipho the Logistics Coordinator"**

| Attribute                | Detail                                                            |
| ------------------------ | ----------------------------------------------------------------- |
| **Role**                 | Vineyard Manager / Bottler Operations Lead / Freight Forwarder    |
| **Tech Profile**         | Mixed — Pieter uses Android in the field; Sipho is desktop-based  |
| **Language**             | Afrikaans-first (rural Western Cape) or English (urban logistics) |
| **Engagement Frequency** | 1–4 times per year, deadline-driven                               |

**JTBD:**

- **Functional:** "When the winery asks for my data, I want to submit it quickly so that I can get back to my real job."
- **Emotional:** "I want to understand why this data matters so that I don't feel like I'm just doing admin work."
- **Social:** "I want to protect my commercial confidentiality so that my competitors don't know my yields."

**Pain Points:**

1. 🔴 **Doesn't understand why the data matters to him** — needs business context, not lectures
2. 🔴 **Filling complex forms in a second language** is genuinely frustrating
3. 🟠 **No incentive to be timely** — currently the winery chases him, not the platform
4. 🟠 **Concerned about commercial confidentiality** of yield/volume data

**Functional Fallbacks:**

- If Pieter can't access the platform, Admin should be able to input on his behalf (with audit trail)
- If Pieter is offline, allow SMS-based data collection as fallback
- If Pieter speaks only Afrikaans, UI must default to Afrikaans with one click

---

### 🥉 Tertiary Persona: Internal Reviewer / Auditor

**"Lerato the Compliance Officer"**

| Attribute                        | Detail                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| **Role**                         | Internal compliance officer or external sustainability consultant                   |
| **Need**                         | Verify uploaded evidence matches entered data; flag discrepancies; approve sections |
| **Critical Feature Requirement** | Verification badges on output reports; commenting/query workflow                    |

**JTBD:**

- **Functional:** "When reviewing submitted data, I want to see discrepancies immediately so that I can flag them before submission."
- **Emotional:** "I want to trust the platform's calculations so that I don't have to double-check every number."
- **Social:** "I want my verification badge on the report so that I'm accountable for the data quality."

**Pain Points:**

- No centralized view of pending reviews
- Can't add comments to specific data points
- No version control on evidence documents

---

## User Journey Mapping

### Primary Persona Journey (Annika - Admin)

```
1. ONBOARDING
   ├─ Receives pilot invite from EmissioTrace team
   ├─ Registers company and adds 15 SKUs
   └─ Invites 3 contributors via email/SMS

2. SUPPLY CHAIN MAPPING
   ├─ Drags nodes to create visual supply chain for SKU #1
   ├─ Assigns Pieter (grape grower) to "Cultivation" node
   └─ Sends invite with personalized message

3. DATA COLLECTION (Waiting Period)
   ├─ Dashboard shows 0/3 contributors completed
   ├─ Sends automated reminder after 7 days
   └─ Pieter completes cultivation wizard on Day 10

4. REVIEW & VERIFICATION
   ├─ Lerato reviews Pieter's submission
   ├─ Flags discrepancy in fertilizer quantities
   ├─ Pieter updates data with evidence upload
   └─ Lerato approves section

5. CALCULATION & EXPORT
   ├─ System calculates CO₂e for SKU #1
   ├─ Annika reviews dashboard (4-pillar breakdown)
   ├─ Exports Systembolaget-ready CSV + PDF
   └─ Submits to Systembolaget before deadline
```

### Secondary Persona Journey (Pieter - Contributor)

```
1. INVITE RECEIPT
   ├─ Receives SMS: "Annika from Stellenbosch Winery has invited you to contribute
   │   data to EmissioTrace. Click here: [tokenized link]"
   └─ Clicks link on Android phone

2. ACCOUNT CREATION
   ├─ Lands on mobile-responsive registration page
   ├─ Selects "Afrikaans" as preferred language
   └─ Creates password (no email required)

3. GUIDED WIZARD
   ├─ Sees contextual help: "Why we need this data: Systembolaget requires
   │   carbon footprint for wine exports. Your data helps Annika keep her export license."
   ├─ Completes Cultivation Wizard:
   │   ├─ Fertilizer type (dropdown with SA brands)
   │   ├─ Diesel usage for tractors (simple number input)
   │   └─ Yield per hectare (confidential, encrypted storage)
   ├─ Uploads evidence (fertilizer purchase invoice)
   └─ Submits with digital signature

4. CONFIRMATION
   └─ Sees: "Thank you, Pieter! Annika has been notified. You're done for this year."
```

---

## Market Size & Opportunity

### Total Addressable Market (TAM)

**African Beverage Exporters** = ~600+ suppliers (Year 3+ opportunity)

### Serviceable Addressable Market (SAM)

**SA Beverage Exporters Globally** = ~550+ suppliers (Year 1-2 focus)

- Wine exporters: ~400+
- Spirits & craft beer: ~150+

### Serviceable Obtainable Market (SOM)

**SA Wine Exporters to Systembolaget** = ~80–120 active suppliers (beachhead)

### Market Penetration Strategy

| Phase       | Timeline     | Target Segment                           | Penetration Goal                 |
| ----------- | ------------ | ---------------------------------------- | -------------------------------- |
| **Phase 1** | Months 0–6   | Systembolaget suppliers (pilot partners) | 5–10 suppliers (6–8% of SAM)     |
| **Phase 2** | Months 6–18  | All SA wine exporters to EU/Nordic       | 30–50 suppliers (6–10% of SAM)   |
| **Phase 3** | Months 18–36 | SA spirits & African exporters           | 80–100 suppliers (15–20% of TAM) |

---

## Differentiation Strategy

### Methodological Moat (Defensible IP)

**EmissioTrace Factor Library v1.0** — The proprietary SA-localized emission factor database is a **defensible asset** that requires:

1. **Licensed Data:** EcoInvent license (€5,000 one-time)
2. **Domain Expertise:** 2+ years of consultancy work to curate SA-specific factors
3. **Industry Validation:** SAWIS or WWF-SA endorsement (credibility multiplier)
4. **Network Effects:** As more suppliers use it, the factor library improves (anonymized peer benchmarking)

### Product Moat (User Experience)

- **Visual Supply Chain Builder:** Competitors use spreadsheets or text-based forms
- **Bilingual UI (English/Afrikaans):** Competitors assume English-only users
- **Contributor-Centric Design:** Competitors focus on admin users only
- **Mobile-First Contributor Forms:** Competitors are desktop-only

### Commercial Moat (Pricing & Relationships)

- **Price Point:** €1,200–€7,800/year vs. €15,000–€50,000/year for consultants
- **Existing Network:** Founder's consultancy relationships = warm intro advantage
- **Regulatory Timing:** Systembolaget 2026 deadline = forced adoption = pricing power

---

## Success Metrics (Product-Led)

### Activation Metrics

- **Time to First Supply Chain Mapped:** < 30 minutes (target)
- **Contributor Invite Acceptance Rate:** > 70% (target)
- **Wizard Completion Rate:** > 80% (target)

### Retention Metrics

- **Annual Churn Rate:** < 8% (target, high regulatory stickiness)
- **Feature Adoption (4-Pillar Usage):** > 60% use all 4 wizards
- **Report Export Frequency:** > 1 per quarter per customer

### Revenue Metrics

- **Average Revenue Per Customer (ARPU):** €2,800 (Year 1) → €4,200 (Year 3)
- **Customer Acquisition Cost (CAC):** < €2,000
- **LTV/CAC Ratio:** > 3:1 (target)

---

## Risk Assessment (Product Perspective)

### Product Risks

| Risk                                                | Impact | Mitigation                                                        |
| --------------------------------------------------- | ------ | ----------------------------------------------------------------- |
| **Contributor UX fails for low-literacy users**     | HIGH   | Conduct 3 in-field usability tests; add voice-note alternatives   |
| **Mobile responsiveness breaks on low-end Android** | MEDIUM | Test on Android 8+ devices with 2GB RAM; optimize for 3G networks |
| **Bilingual UI increases development complexity**   | LOW    | Use i18n framework from Day 1; hire Afrikaans-speaking QA tester  |

### Market Risks

| Risk                                           | Impact | Mitigation                                                           |
| ---------------------------------------------- | ------ | -------------------------------------------------------------------- |
| **Systembolaget delays mandatory reporting**   | HIGH   | Pivot to UK PAS 2050 / EU PEF export formats (Phase 2 roadmap)       |
| **Competitor launches SA-specific offering**   | HIGH   | Accelerate beachhead capture; secure exclusivity with pilot partners |
| **SA wine industry consolidation reduces TAM** | MEDIUM | Expand to Kenya coffee liqueurs / Mauritius rum (Year 3)             |

---

## Edge Case Handling

### Data Quality Edge Cases

1. **Missing Data Points:**
   - System should allow "partial submission" with flagged missing fields
   - Admin can input estimates with "estimated" badge (not for final export)
   - Contributor receives contextual help: "This field is required for ISO 14067 compliance"

2. **Conflicting Data:**
   - If Pieter says 10 tons CO₂e and Annika's consultant said 15 tons last year
   - System should flag discrepancy: "Previous year: 15 tons. Reason for 33% reduction?"
   - Reviewer (Lerato) must approve before export

3. **Evidence Mismatch:**
   - If Pieter uploads fertilizer invoice showing 500kg, but inputs 400kg
   - OCR should auto-extract from invoice and flag mismatch
   - If OCR unavailable, Reviewer flags during review

### Technical Edge Cases

1. **Offline Contributor:**
   - Pieter has no internet at vineyard
   - Fallback: SMS-based data collection (MVP Phase 2)
   - Better fallback: Offline-first PWA with sync when online (MVP Phase 2)

2. **Language Switching Mid-Wizard:**
   - Pieter starts in Afrikaans, switches to English halfway
   - System should persist language preference per user, not per session
   - All evidence documents remain in original language (no auto-translation)

3. **Contributor Leaves Company:**
   - Pieter retires, new vineyard manager takes over
   - Admin can re-assign node to new contributor
   - Audit trail shows "Pieter (2024) → New Manager (2025)" with data versioning

---

## Document History

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Post-Pilot UAT (Month 6)
