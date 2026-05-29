# API Context: EmissioTrace

## FastAPI REST Routing Map

### Authentication Endpoints

| Method | Endpoint                | Description                       | Access                      | Request Schema       | Response Schema                          |
| ------ | ----------------------- | --------------------------------- | --------------------------- | -------------------- | ---------------------------------------- |
| POST   | `/api/auth/register`    | Register new company + admin user | Public                      | `UserRegisterSchema` | `UserResponseSchema` (JWT tokens)        |
| POST   | `/api/auth/login`       | Login with email/password         | Public                      | `UserLoginSchema`    | `TokenResponseSchema` (access + refresh) |
| POST   | `/api/auth/verify-mfa`  | Verify MFA TOTP code              | Public (with temp token)    | `MFAVerifySchema`    | `TokenResponseSchema` (with MFA claim)   |
| POST   | `/api/auth/refresh`     | Refresh access token              | Public (with refresh token) | `RefreshTokenSchema` | `TokenResponseSchema`                    |
| GET    | `/api/auth/me`          | Get current user profile          | Authenticated               | -                    | `UserResponseSchema`                     |
| POST   | `/api/auth/logout`      | Invalidate refresh token          | Authenticated               | -                    | `MessageSchema`                          |
| POST   | `/api/auth/mfa/enable`  | Enable MFA for user               | Authenticated               | -                    | `MFASetupSchema` (secret + QR code)      |
| POST   | `/api/auth/mfa/disable` | Disable MFA for user              | Authenticated               | `MFAVerifySchema`    | `MessageSchema`                          |

### User Management Endpoints

| Method | Endpoint               | Description                            | Access     | Request Schema                 | Response Schema                    |
| ------ | ---------------------- | -------------------------------------- | ---------- | ------------------------------ | ---------------------------------- |
| GET    | `/api/users`           | List users in tenant                   | Admin      | Query: `role`, `page`, `limit` | `ListResponse[UserResponseSchema]` |
| POST   | `/api/users`           | Invite new user (contributor/reviewer) | Admin      | `UserInviteSchema`             | `UserResponseSchema`               |
| GET    | `/api/users/{user_id}` | Get user details                       | Admin/Self | -                              | `UserResponseSchema`               |
| PUT    | `/api/users/{user_id}` | Update user (role, language)           | Admin/elf  | `UserUpdateSchema`             | `UserResponseSchema`               |
| DELETE | `/api/users/{user_id}` | Deactivate user                        | Admin      | -                              | `MessageSchema`                    |

### Product Endpoints

| Method | Endpoint                     | Description                | Access          | Request Schema                     | Response Schema                                 |
| ------ | ---------------------------- | -------------------------- | --------------- | ---------------------------------- | ----------------------------------------------- |
| GET    | `/api/products`              | List products (SKUs)       | Admin, Reviewer | Query: `category`, `page`, `limit` | `ListResponse[ProductResponseSchema]`           |
| POST   | `/api/products`              | Create new product         | Admin           | `ProductCreateSchema`              | `ProductResponseSchema`                         |
| GET    | `/api/products/{product_id}` | Get product details        | Admin, Reviewer | -                                  | `ProductResponseSchema` (includes supply chain) |
| PUT    | `/api/products/{product_id}` | Update product             | Admin           | `ProductUpdateSchema`              | `ProductResponseSchema`                         |
| DELETE | `/api/products/{product_id}` | Delete product (+ cascade) | Admin           | -                                  | `MessageSchema`                                 |

### Supply Chain Endpoints

| Method | Endpoint                              | Description                            | Access                                  | Request Schema            | Response Schema                           |
| ------ | ------------------------------------- | -------------------------------------- | --------------------------------------- | ------------------------- | ----------------------------------------- |
| GET    | `/api/supply-chains`                  | List supply chains                     | Admin, Reviewer                         | Query: `product_id`       | `ListResponse[SupplyChainResponseSchema]` |
| POST   | `/api/supply-chains`                  | Create supply chain (drag-drop config) | Admin                                   | `SupplyChainCreateSchema` | `SupplyChainResponseSchema`               |
| GET    | `/api/supply-chains/{chain_id}`       | Get supply chain with nodes            | Admin, Reviewer, Contributor (assigned) | -                         | `SupplyChainResponseSchema`               |
| PUT    | `/api/supply-chains/{chain_id}`       | Update nodes/assign contributors       | Admin                                   | `SupplyChainUpdateSchema` | `SupplyChainResponseSchema`               |
| DELETE | `/api/supply-chains/{chain_id}`       | Delete supply chain                    | Admin                                   | -                         | `MessageSchema`                           |
| POST   | `/api/supply-chains/{chain_id}/clone` | Clone chain for another product        | Admin                                   | `CloneChainSchema`        | `SupplyChainResponseSchema`               |

### Submission Endpoints (Contributor Wizards)

| Method | Endpoint                                   | Description                            | Access                               | Request Schema                                  | Response Schema                                     |
| ------ | ------------------------------------------ | -------------------------------------- | ------------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| GET    | `/api/submissions`                         | List submissions                       | Admin, Reviewer                      | Query: `product_id`, `status`, `contributor_id` | `ListResponse[SubmissionResponseSchema]`            |
| POST   | `/api/submissions`                         | Create/update submission (wizard data) | Contributor (assigned)               | `SubmissionCreateSchema`                        | `SubmissionResponseSchema`                          |
| GET    | `/api/submissions/{submission_id}`         | Get submission details                 | Admin, Reviewer, Contributor (owner) | -                                               | `SubmissionResponseSchema` (includes evidence docs) |
| PUT    | `/api/submissions/{submission_id}`         | Update submission (draft)              | Contributor (owner)                  | `SubmissionUpdateSchema`                        | `SubmissionResponseSchema`                          |
| POST   | `/api/submissions/{submission_id}/submit`  | Submit for review                      | Contributor (owner)                  | -                                               | `SubmissionResponseSchema` (status → "submitted")   |
| POST   | `/api/submissions/{submission_id}/approve` | Approve submission (Reviewer)          | Reviewer                             | `ReviewCreateSchema`                            | `SubmissionResponseSchema` (status → "approved")    |
| POST   | `/api/submissions/{submission_id}/reject`  | Reject submission (Reviewer)           | Reviewer                             | `ReviewCreateSchema`                            | `SubmissionResponseSchema` (status → "rejected")    |

### Evidence Document Endpoints

| Method | Endpoint                                     | Description                         | Access                                 | Request Schema                   | Response Schema                        |
| ------ | -------------------------------------------- | ----------------------------------- | -------------------------------------- | -------------------------------- | -------------------------------------- |
| POST   | `/api/submissions/{submission_id}/documents` | Upload evidence document            | Contributor (owner)                    | Multipart: `file`, `description` | `DocumentResponseSchema`               |
| GET    | `/api/documents/{document_id}`               | Download document (with decryption) | Admin, Reviewer, Contributor (related) | -                                | File stream (application/octet-stream) |
| DELETE | `/api/documents/{document_id}`               | Delete document                     | Contributor (owner), Admin             | -                                | `MessageSchema`                        |
| POST   | `/api/documents/{document_id}/verify`        | Apply verification badge            | Reviewer                               | `VerificationSchema`             | `DocumentResponseSchema`               |

### Calculation Endpoints

| Method | Endpoint                         | Description                                | Access                        | Request Schema                         | Response Schema                                   |
| ------ | -------------------------------- | ------------------------------------------ | ----------------------------- | -------------------------------------- | ------------------------------------------------- |
| POST   | `/api/calculate/{product_id}`    | Trigger CO₂e calculation                   | Admin, Contributor (assigned) | -                                      | `CalculationResponseSchema`                       |
| GET    | `/api/calculations/{product_id}` | Get latest calculation                     | Admin, Reviewer               | Query: `factor_version`                | `CalculationResponseSchema` (breakdown by pillar) |
| GET    | `/api/dashboard/summary`         | Get dashboard summary (4-pillar breakdown) | Admin                         | Query: `product_id` (optional for all) | `DashboardSummarySchema`                          |

### Export Endpoints

| Method | Endpoint                            | Description                              | Access | Request Schema        | Response Schema                  |
| ------ | ----------------------------------- | ---------------------------------------- | ------ | --------------------- | -------------------------------- |
| POST   | `/api/exports/csv`                  | Generate Systembolaget CSV (Celery task) | Admin  | `ExportRequestSchema` | `ExportResponseSchema` (task_id) |
| POST   | `/api/exports/pdf`                  | Generate PDF report (Celery task)        | Admin  | `ExportRequestSchema` | `ExportResponseSchema` (task_id) |
| GET    | `/api/exports/{task_id}`            | Check export task status                 | Admin  | -                     | `TaskStatusSchema`               |
| GET    | `/api/exports/download/{export_id}` | Download completed export                | Admin  | -                     | File stream (CSV or PDF)         |

### Audit & Compliance Endpoints

| Method | Endpoint                 | Description              | Access          | Request Schema                                             | Response Schema                |
| ------ | ------------------------ | ------------------------ | --------------- | ---------------------------------------------------------- | ------------------------------ |
| GET    | `/api/audit-logs`        | List audit trail entries | Admin, Reviewer | Query: `table_name`, `record_id`, `start_date`, `end_date` | `ListResponse[AuditLogSchema]` |
| GET    | `/api/audit-logs/export` | Export audit log as PDF  | Admin           | Query: `start_date`, `end_date`                            | File stream (PDF)              |

### Invite Endpoints (Tokenized Links)

| Method | Endpoint                      | Description                                          | Access | Request Schema       | Response Schema          |
| ------ | ----------------------------- | ---------------------------------------------------- | ------ | -------------------- | ------------------------ |
| POST   | `/api/invites`                | Send contributor invite (email/SMS)                  | Admin  | `InviteCreateSchema` | `InviteResponseSchema`   |
| GET    | `/api/invites/{token}`        | Validate invite token (for contributor registration) | Public | -                    | `InviteValidationSchema` |
| POST   | `/api/invites/{token}/accept` | Accept invite + create account                       | Public | `InviteAcceptSchema` | `TokenResponseSchema`    |

---

## Pydantic Schema Validation Contracts

### Core Schemas (Shared)

```python
# schemas/base.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID

class MessageSchema(BaseModel):
    message: str

class ListResponse(BaseModel):
    items: list
    total: int
    page: int
    limit: int
```

### User Schemas

```python
# schemas/users.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class UserBaseSchema(BaseModel):
    email: EmailStr
    role: Literal["admin", "contributor", "reviewer"]
    preferred_language: Literal["en", "af"] = "en"

class UserRegisterSchema(UserBaseSchema):
    password: str = Field(..., min_length=8)
    company_name: str = Field(..., min_length=2)
    invite_token: Optional[str] = None  # For contributors accepting invite

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserResponseSchema(UserBaseSchema):
    id: UUID
    tenant_id: UUID
    is_active: bool
    mfa_enabled: bool
    last_login: Optional[datetime]
    created_at: datetime

class UserUpdateSchema(BaseModel):
    preferred_language: Optional[Literal["en", "af"]] = None
    role: Optional[Literal["admin", "contributor", "reviewer"]] = None
    is_active: Optional[bool] = None
```

### Product Schemas

```python
# schemas/products.py
from pydantic import BaseModel, Field
from typing import Optional, Literal
from uuid import UUID

class ProductCreateSchema(BaseModel):
    sku_code: str = Field(..., min_length=3, max_length=50)
    name: str = Field(..., min_length=2, max_length=200)
    category: Literal["wine", "spirits", "beer"]
    volume_liters: float = Field(..., gt=0)
    metadata: Optional[dict] = None

class ProductResponseSchema(ProductCreateSchema):
    id: UUID
    tenant_id: UUID
    created_at: datetime
    supply_chain_id: Optional[UUID] = None
```

### Supply Chain Schemas

```python
# schemas/supply_chains.py
from pydantic import BaseModel, Field
from typing import Optional, list
from uuid import UUID

class NodeSchema(BaseModel):
    id: Optional[UUID] = None
    node_type: Literal["cultivation", "production", "packaging", "transport"]
    assigned_contributor_id: Optional[UUID] = None
    position: dict  # {"x": float, "y": float}

class SupplyChainCreateSchema(BaseModel):
    product_id: UUID
    name: str = Field(..., min_length=2)
    nodes: list[NodeSchema]  # Drag-drop configuration

class SupplyChainResponseSchema(BaseModel):
    id: UUID
    tenant_id: UUID
    product_id: UUID
    name: str
    nodes: list[NodeSchema]
    created_at: datetime
```

### Submission Schemas (4-Pillar Wizard Data)

```python
# schemas/submissions.py
from pydantic import BaseModel, Field
from typing import Optional, Literal
from uuid import UUID

# Cultivation Wizard Data
class CultivationData(BaseModel):
    fertilizer_type: str = Field(..., description="SA brand, e.g., 'AN (28% N)'")
    fertilizer_amount_kg: float = Field(..., gt=0)
    diesel_tractor_liters: float = Field(default=0, ge=0)
    yield_per_hectare: float = Field(..., gt=0)
    cultivated_area_ha: float = Field(..., gt=0)

# Production Wizard Data
class ProductionData(BaseModel):
    eskom_kwh: float = Field(..., ge=0)
    diesel_genset_hours: float = Field(default=0, ge=0)
    load_shedding_hours: float = Field(default=0, ge=0)

# Packaging Wizard Data
class PackagingData(BaseModel):
    glass_weight_kg: float = Field(..., gt=0)
    closure_type: str = Field(..., description="e.g., 'screwcap', 'cork'")
    recycled_content_percent: float = Field(default=0, ge=0, le=100)

# Transport Wizard Data
class TransportSegment(BaseModel):
    mode: Literal["road", "ocean", "air"]
    distance_km: float = Field(..., gt=0)
    load_factor: float = Field(default=1.0, ge=0.1, le=1.0)  # Capacity utilization

class TransportData(BaseModel):
    segments: list[TransportSegment]

# Combined Wizard Data
class WizardData(BaseModel):
    cultivation: Optional[CultivationData] = None
    production: Optional[ProductionData] = None
    packaging: Optional[PackagingData] = None
    transport: Optional[TransportData] = None

class SubmissionCreateSchema(BaseModel):
    node_id: UUID  # Which node this submission is for
    wizard_data: WizardData

class SubmissionResponseSchema(BaseModel):
    id: UUID
    tenant_id: UUID
    product_id: UUID
    contributor_id: UUID
    node_id: UUID
    wizard_data: WizardData
    status: Literal["draft", "submitted", "under_review", "approved", "rejected"]
    submitted_at: Optional[datetime] = None
```

### Calculation Schemas

```python
# schemas/calculations.py
from pydantic import BaseModel, Field
from typing import Optional, dict
from uuid import UUID

class PillarBreakdown(BaseModel):
    cultivation_co2e_kg: float
    production_co2e_kg: float
    packaging_co2e_kg: float
    transport_co2e_kg: float

class CalculationResponseSchema(BaseModel):
    id: UUID
    product_id: UUID
    total_co2e_kg: float
    breakdown: PillarBreakdown
    factor_library_version: str
    calculated_at: datetime

class DashboardSummarySchema(BaseModel):
    total_products: int
    total_co2e_kg: float
    breakdown: PillarBreakdown
    submissions_pending: int
    submissions_approved: int
```

### Export Schemas

```python
# schemas/exports.py
from pydantic import BaseModel, Field
from typing import Optional, Literal
from uuid import UUID

class ExportRequestSchema(BaseModel):
    product_ids: Optional[list[UUID]] = None  # None = all products
    format: Literal["systembolaget_csv", "pdf_report", "uk_pas2050", "eu_pef"]
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class ExportResponseSchema(BaseModel):
    task_id: str
    status: Literal["pending", "started", "success", "failure"]
    export_id: Optional[UUID] = None
```

---

## Celery Background Worker Queues & Beat Schedules

### Task Definitions

| Task Name                | Queue           | Description                                 | Trigger               | Retry Policy                       |
| ------------------------ | --------------- | ------------------------------------------- | --------------------- | ---------------------------------- |
| `send_email_invite`      | `notifications` | Send contributor invite email               | Admin sends invite    | Max 3 retries, exponential backoff |
| `send_sms_invite`        | `notifications` | Send contributor invite SMS                 | Admin sends invite    | Max 3 retries                      |
| `send_email_reminder`    | `notifications` | Send reminder email (7 days)                | Celery Beat schedule  | Max 2 retries                      |
| `send_sms_reminder`      | `notifications` | Send reminder SMS (14 days)                 | Celery Beat schedule  | Max 2 retries                      |
| `generate_csv_export`    | `exports`       | Generate Systembolaget CSV                  | Admin requests export | Max 1 retry (long-running)         |
| `generate_pdf_report`    | `exports`       | Generate PDF report with verification trail | Admin requests export | Max 1 retry                        |
| `calculate_product_co2e` | `calculations`  | Trigger CO₂e calculation                    | Submission approved   | Max 2 retries                      |
| `notify_reviewer`        | `notifications` | Notify reviewer of new submission           | Submission submitted  | Max 2 retries                      |
| `purge_old_audit_logs`   | `maintenance`   | Archive audit logs > 7 years                | Celery Beat (yearly)  | No retry                           |

### Celery Beat Schedule (Automated Reminders)

```python
# celery_app.py
from celery.schedules import crontab

beat_schedule = {
    # Check for pending submissions every hour, send reminders if needed
    'check-reminders': {
        'task': 'tasks.reminders.check_and_send_reminders',
        'schedule': crontab(minute=0),  # Every hour
    },
    # Purge old audit logs yearly (1st Jan)
    'purge-audit-logs': {
        'task': 'tasks.maintenance.purge_old_audit_logs',
        'schedule': crontab(month_of_year=1, day_of_month=1, hour=2),
    },
    # Update factor library annually (1st Dec)
    'update-factor-library': {
        'task': 'tasks.calculations.update_factor_library',
        'schedule': crontab(month_of_year=12, day_of_month=1, hour=1),
    },
}
```

---

## Third-Party API Integration Contracts

### Mailgun (Email Service)

| API Endpoint                                   | Method | Purpose                   | Request Format                             | Response              |
| ---------------------------------------------- | ------ | ------------------------- | ------------------------------------------ | --------------------- |
| `https://api.mailgun.net/v3/{domain}/messages` | POST   | Send transactional emails | Form data: `from`, `to`, `subject`, `html` | 200 OK + `message_id` |

**Integration Code:**

```python
# integrations/mailgun.py
import os
import requests

MAILGUN_API_KEY = os.getenv("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.getenv("MAILGUN_DOMAIN")
EMAIL_FROM = os.getenv("EMAIL_FROM")

def send_email(to: str, subject: str, html_body: str, text_body: str = None) -> str:
    """Send email via Mailgun API."""
    url = f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages"
    response = requests.post(
        url,
        auth=("api", MAILGUN_API_KEY),
        data={
            "from": EMAIL_FROM,
            "to": to,
            "subject": subject,
            "html": html_body,
            "text": text_body or html_body,
        },
    )
    response.raise_for_status()
    return response.json()["id"]
```

### Clickatell (SMS Service)

| API Endpoint                               | Method | Purpose             | Request Format        | Response              |
| ------------------------------------------ | ------ | ------------------- | --------------------- | --------------------- |
| `https://platform.clickatell.com/messages` | POST   | Send SMS (SA reach) | JSON: `content`, `to` | 200 OK + `message_id` |

**Integration Code:**

```python
# integrations/clickatell.py
import os
import requests

CLICKATELL_API_KEY = os.getenv("CLICKATELL_API_KEY")
SMS_FROM = os.getenv("SMS_FROM")

def send_sms(to: str, message: str) -> str:
    """Send SMS via Clickatell API."""
    url = "https://platform.clickatell.com/messages"
    headers = {
        "Authorization": f"Bearer {CLICKATELL_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "messages": [
            {
                "channel": "sms",
                "to": to,
                "content": message,
                "from": SMS_FROM,
            }
        ]
    }
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()["messages"][0]["messageId"]
```

### WhatsApp Business API (Phase 2)

| API Endpoint                                           | Method | Purpose                        | Request Format                                      | Response              |
| ------------------------------------------------------ | ------ | ------------------------------ | --------------------------------------------------- | --------------------- |
| `https://graph.facebook.com/v19.0/{phone-id}/messages` | POST   | Send WhatsApp template message | JSON: `messaging_product`, `to`, `type`, `template` | 200 OK + `message_id` |

**Template Example:**

```json
{
  "messaging_product": "whatsapp",
  "to": "+27821234567",
  "type": "template",
  "template": {
    "name": "contributor_invite",
    "language": { "code": "en" },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Annika from Stellenbosch Winery" },
          { "type": "text", "text": "https://app.emissiotrace.com/accept-invite/{token}" }
        ]
      }
    ]
  }
}
```

### EcoInvent (Licensed Emission Factor Database)

**Integration:** Not API-based. License provides access to SQL database or export files (CSV/JSON).

**Process:**

1. License EcoInvent (€5,000 one-time).
2. Export factors for relevant categories (agriculture, packaging, transport).
3. Transform to EmissioTrace factor library format.
4. Import into PostgreSQL `factor_library` table via script.

**Script Example:**

```python
# scripts/import_ecoinvent.py
import csv
from app.models import FactorLibrary
from app.database import SessionLocal

def import_ecoinvent(csv_path: str, version: str):
    db = SessionLocal()
    with open(csv_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            factor = FactorLibrary(
                version=version,
                category=row["category"],
                name=row["name"],
                emission_factor=float(row["emission_factor"]),
                unit=row["unit"],
                source="EcoInvent",
                effective_date=row["effective_date"],
            )
            db.add(factor)
    db.commit()
```

---

## WebSocket Implementations (Optional - Real-Time Updates)

### Dashboard Real-Time Updates

**Endpoint:** `/ws/dashboard/{tenant_id}`

**Purpose:** Push real-time updates to admin dashboard when:

- Contributor submits data
- Reviewer approves/rejects submission
- Calculation completes

**Message Format:**

```json
{
  "event": "submission_approved",
  "data": {
    "submission_id": "uuid",
    "product_id": "uuid",
    "contributor_name": "Pieter",
    "timestamp": "2026-05-28T15:30:00Z"
  }
}
```

**Implementation (FastAPI + WebSockets):**

```python
# websockets/dashboard.py
from fastapi import APIRouter, WebSocket, Depends
from app.auth import get_current_user_ws

router = APIRouter()

@router.websocket("/ws/dashboard/{tenant_id}")
async def dashboard_websocket(websocket: WebSocket, tenant_id: str):
    # Validate tenant access
    user = await get_current_user_ws(websocket)
    if str(user.tenant_id) != tenant_id:
        await websocket.close(code=4003, reason="Unauthorized")
        return

    await websocket.accept()
    # Subscribe to Redis pub/sub channel for tenant
    # Push updates when events occur
```

---

## Error Handling & Status Codes

### Standard HTTP Status Codes

| Code | Meaning               | Usage                                            |
| ---- | --------------------- | ------------------------------------------------ |
| 200  | OK                    | Successful GET, PUT, POST (non-creation)         |
| 201  | Created               | Successful POST (resource created)               |
| 204  | No Content            | Successful DELETE                                |
| 400  | Bad Request           | Invalid request body (Pydantic validation error) |
| 401  | Unauthorized          | Invalid/missing JWT token                        |
| 403  | Forbidden             | Insufficient role permissions                    |
| 404  | Not Found             | Resource not found (or not owned by tenant)      |
| 409  | Conflict              | Duplicate SKU code, etc.                         |
| 429  | Too Many Requests     | Rate limit exceeded                              |
| 500  | Internal Server Error | Unhandled exception                              |

### Error Response Schema

```python
# schemas/errors.py
class ErrorResponseSchema(BaseModel):
    error: str  # "validation_error", "authentication_error", etc.
    message: str  # Human-readable message
    details: Optional[dict] = None  # Pydantic validation errors
```

---

## Rate Limiting

### Endpoints Requiring Rate Limiting

| Endpoint Category           | Limit       | Window     | Justification                          |
| --------------------------- | ----------- | ---------- | -------------------------------------- |
| `/api/auth/*`               | 5 requests  | per minute | Prevent brute-force login              |
| `/api/exports/*`            | 2 requests  | per minute | Long-running tasks, resource intensive |
| `/api/documents/*` (upload) | 10 requests | per minute | File upload bandwidth                  |
| All other endpoints         | 60 requests | per minute | Standard API usage                     |

**Implementation (FastAPI middleware or dependency):**

```python
# dependencies/rate_limit.py
from fastapi import Depends, HTTPException
from redis import Redis
import time

def rate_limit(request, limit: int = 60, window: int = 60):
    redis = Redis.from_url(os.getenv("REDIS_URL"))
    key = f"rate_limit:{request.client.host}"
    current = redis.get(key)
    if current and int(current) >= limit:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    pipe = redis.pipeline()
    pipe.incr(key)
    pipe.expire(key, window)
    pipe.execute()
```

---

## Document History

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Post-API Implementation (Month 2)
