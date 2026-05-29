## EmissioTrace Sitemap

### Public Pages (Unauthenticated)

```
/
├── / (Landing Page - Value proposition, pricing, testimonials)
├── /login (Admin/Reviewer login with MFA)
├── /register (Company registration)
├── /forgot-password (Password reset flow)
├── /accept-invite (Tokenized contributor invite acceptance)
├── /pricing (Tier display: €1,200 - €7,800/year)
├── /about (Methodology, SAWIS partnership, team)
└── /contact (Demo request, support)
```

### Admin Portal (Primary Persona: Annika)

```
/admin
├── /dashboard (KPI overview, completion rates, 4-pillar breakdown charts)
│
├── /company (Company profile management)
│   ├── /profile (Logo, details, branding)
│   ├── /team (Manage Admin/Reviewer users)
│   └── /billing (Subscription management)
│
├── /products (SKU management)
│   ├── / (List all SKUs with status)
│   ├── /new (Add new SKU)
│   ├── /[skuId] (SKU detail view)
│   ├── /[skuId]/supply-chain (Visual supply chain builder)
│   └── /[skuId]/templates (Supply chain template management)
│
├── /contributors (Contributor management)
│   ├── / (List all contributors with status)
│   ├── /invite (Send new invites via email/SMS)
│   ├── /[contributorId] (Contrib detail + reassignment)
│   └── /reminders (Configure automated reminder settings)
│
├── /calculations (Emission calculations)
│   ├── / (Calculation results overview)
│   ├── /[skuId] (Per-SKU CO₂e breakdown)
│   └── /factors (View SA-localized emission factor library v1.0)
│
├── /reports (Export & compliance)
│   ├── / (Report generation hub)
│   ├── /systembolaget (Systembolaget/CarbonCloud CSV export)
│   ├── /pdf (Branded PDF report with verification trail)
│   ├── /multi-framework (UK PAS 2050, EU PEF exports - P2)
│   └── /trends (Year-over-year emission trends - P2)
│
├── /audit (Compliance & verification)
│   ├── /trail (Immutable audit trail viewer)
│   ├── /queries (Open reviewer queries)
│   └── /documents (Evidence vault browser)
│
└── /settings (Account & preferences)
    ├── /profile (Admin user profile)
    ├── /language (English/Afrikaans toggle)
    └── /security (MFA, password, sessions)
```

### Contributor Portal (Secondary Persona: Pieter)

```
/contributor
├── /dashboard (My assigned tasks, completion status)
│
├── /tasks (Data submission wizards)
│   ├── / (List all assigned nodes across SKUs)
│   ├── /[taskId] (4-Pillar Wizard - single task)
│   │   ├── /cultivation (Fertilizer, diesel, yield inputs)
│   │   ├── /production (Eskom grid, genset hours)
│   │   ├── /packaging (Glass weight, closures, recycled %)
│   │   └── /transport (Multimodal: truck → ship)
│   └── /[taskId]/upload (Evidence document drag-drop)
│
├── /my-data (View previously submitted data)
│   ├── /history (Submission history with versions)
│   └── /queries (Reviewer queries requiring response)
│
└── /settings
    ├── /profile (Personal details)
    ├── /language (English/Afrikaans preference)
    └── /notifications (SMS/email preferences)
```

### Reviewer Portal (Tertiary Persona: Lerato)

```
/reviewer
├── /dashboard (Pending reviews, flagged items)
│
├── /reviews (Verification workflow)
│   ├── / (List all submissions pending review)
│   ├── /[submissionId] (Review interface)
│   │   ├── /data (View contributor inputs with context)
│   │   ├── /evidence (Verify uploaded documents)
│   │   ├── /queries (Add comments/raise queries)
│   │   └── /approve (Approve/reject with digital signature)
│   └── /history (Past reviews with badges)
│
├── /audit (Audit trail access)
│   ├── /trail (Full immutable log viewer)
│   └── /export (Export audit trail as PDF appendix)
│
└── /settings
    ├── /profile (Reviewer details)
    └── /language (English/Afrikaans toggle)
```

### API Routes (Backend - FastAPI)

```
/api/v1
├── /auth (Authentication endpoints)
│   ├── /login (JWT token generation)
│   ├── /register (Company + admin registration)
│   ├── /refresh (Token refresh)
│   └── /mfa (Multi-factor verification)
│
├── /companies (Multi-tenant company management)
├── /users (Role-based user management)
├── /skus (Product/SKU CRUD)
├── /supply-chain (Visual graph data structure)
├── /contributors (Invite system, token management)
├── /wizards (4-Pillar data submission)
├── /calculations (CO₂e calculation engine)
├── /reports (CSV/PDF generation)
├── /audit (Immutable trail logging)
├── /documents (Encrypted MinIO storage)
└── /factors (Emission factor library v1.0)
```

### Mobile-Specific Routes (PWA - Contributor Focus)

```
/mobile (PWA entry points)
├── /wizard/[taskId] (Streamlined mobile wizard)
├── /upload/[taskId] (Camera integration for evidence)
└── /offline-queue (Sync status for offline entries - P2)
```
