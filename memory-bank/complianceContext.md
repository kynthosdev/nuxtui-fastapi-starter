# Compliance Context: EmissioTrace

## Regulatory Requirement Traceability#

### Systembolaget Compliance (Mandatory by 2026)

| Requirement                         | Regulatory Source                             | Implementation                              | Verification                              |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------- | ----------------------------------------- |
| **ISO 14067 Compliance**            | ISO 14067:2018 (Carbon Footprint of Products) | Full audit trail (immutable logs)           | External auditor sign-off                 |
| **Systembolaget Submission Format** | CarbonCloud API specification                 | Configurable CSV export templates           | Validation against CarbonCloud test suite |
| **Emission Factor Transparency**    | ISO 14067 Clause 5.2                          | Methodology whitepaper (published)          | SAWIS/WWF-SA endorsement                  |
| **Data Retention (7 Years)**        | ISO 14067 Clause 8.3                          | Automated archival policy (MinIO lifecycle) | Annual compliance audit                   |
| **Verification Badges**             | ISO 14067 Clause 7.3 (Validation)             | Reviewer approval workflow                  | Digital signatures on PDF reports         |

### GDPR Compliance (EU Buyer Data)

| Requirement                    | GDPR Article | Implementation                                              | Status         |
| ------------------------------ | ------------ | ----------------------------------------------------------- | -------------- |
| **Data Minimization**          | Art. 5(1)(c) | Only collect necessary data (no unnecessary PII)            | 🔴 Not Started |
| **Purpose Limitation**         | Art. 5(1)(b) | Data only used for carbon reporting                         | 🔴 Not Started |
| **Storage Limitation**         | Art. 5(1)(e) | Automated deletion after 7 years                            | 🔴 Not Started |
| **Right to Access**            | Art. 15      | API endpoint: `GET /api/users/{id}/data-export`             | 🔴 Not Started |
| **Right to be Forgotten**      | Art. 17      | API endpoint: `DELETE /api/users/{id}` (anonmyze)           | 🔴 Not Started |
| **Data Portability**           | Art. 20      | API endpoint: `GET /api/exports/user-data` (JSON)           | 🔴 Not Started |
| **Cross-Border Data Transfer** | Art. 44+     | Standard Contractual Clauses (SCCs) + Teraco data residency | 🔴 Not Started |

### POPIA Compliance (South Africa)

| Requirement                    | POPIA Section | Implementation                                     | Status         |
| ------------------------------ | ------------- | -------------------------------------------------- | -------------- |
| **Accountability**             | Sect. 8       | Information Officer registered with Regulator      | 🔴 Not Started |
| **Processing Limitation**      | Sect. 11      | Explicit consent checkbox on registration          | 🔴 Not Started |
| **Data Subject Participation** | Sect. 23-25   | POPIA request form (web form)                      | 🔴 Not Started |
| **Security Safeguards**        | Sect. 19      | AES-256 encryption + MFA                           | 🔴 Not Started |
| **Notification of Breach**     | Sect. 22      | Automated email to Information Officer + Regulator | 🔴 Not Started |

---

## Data Protection Implementation Matrix#

### Encryption at Rest

| Asset                    | Technology                            | Key Management                               | Status         |
| ------------------------ | ------------------------------------- | -------------------------------------------- | -------------- |
| **PostgreSQL Database**  | AES-256 (Transparent Data Encryption) | AWS KMS (or self-managed HashiCorp Vault)    | 🔴 Not Started |
| **MinIO Object Storage** | AES-256 (Server-Side Encryption)      | Per-tenant encryption keys (rotated 90 days) | 🔴 Not Started |
| **Redis Cache**          | AES-256 (AOF persistence encryption)  | Same as PostgreSQL KMS                       | 🔴 Not Started |
| **Kubernetes Secrets**   | AES-256 (etcd encryption at rest)     | K3s built-in encryption                      | 🔴 Not Started |

### Encryption in Transit

| Communication Channel    | Protocol                | Certificate Management                  | Status         |
| ------------------------ | ----------------------- | --------------------------------------- | -------------- |
| **Client → Nginx**       | TLS 1.3                 | Let's Encrypt (auto-renewal)            | 🔴 Not Started |
| **Nginx → FastAPI**      | TLS 1.3 (mTLS optional) | Internal CA (or skip TLS for localhost) | 🔴 Not Started |
| **FastAPI → PostgreSQL** | TLS 1.3 (verify-full)   | PostgreSQL server certificate           | 🔴 Not Started |
| **FastAPI → Redis**      | ACL + TLS (optional)    | Redis AUTH password                     | 🔴 Not Started |
| **FastAPI → MinIO**      | TLS 1.3 (verify-full)   | MinIO server certificate                | 🔴 Not Started |

### Access Control & Authentication

| Layer                   | Mechanism                   | Implementation                  | Status         |
| ----------------------- | --------------------------- | ------------------------------- | -------------- |
| **User Authentication** | JWT (HS256) + MFA (TOTP)    | FastAPI Users or custom         | 🔴 Not Started |
| **Service-to-Service**  | mTLS (optional) or API keys | HashiCorp Vault AppRole         | 🔴 Not Started |
| **Database Access**     | Row-Level Security (RLS)    | PostgreSQL policies (tenant_id) | 🔴 Not Started |
| **Kubernetes Access**   | RBAC + OIDC                 | Cilium (or k3s RBAC)            | 🔴 Not Started |
| **MinIO Access**        | Per-tenant access keys      | MinIO IAM policies              | 🔴 Not Started |

---

## Security Primitives#

### Password Hashing

```python
# security/password.py
import bcrypt
from fastapi import HTTPException

def hash_password(password: str) -> str:
    """Hash password with bcrypt (cost factor 12)."""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against bcrypt hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# Usage in FastAPI endpoint:
# user = User(email=email, password_hash=hash_password(password))
```

**Compliance Note:** bcrypt with cost factor 12 meets NIST SP 800-63B recommendations (as of 2026).

### JWT Token Management

```python
# security/jwt.py
import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))

def create_access_token(user_id: str, mfa_verified: bool = False) -> str:
    """Create JWT access token (expires 30 min)."""
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "iat": datetime.utcnow(),
        "mfa": mfa_verified,  # MFA claim
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    """Create JWT refresh token (expires 7 days)."""
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        "type": "refresh",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    """Decode and verify JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### MFA Implementation (TOTP)

```python
# security/mfa.py
import pyotp
import qrcode
from io import BytesIO
import base64

def generate_mfa_secret() -> tuple[str, str]:
    """Generate TOTP secret + QR code (base64)."""
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)
    provisioning_uri = totp.provisioning_uri(
        name="user@example.com",
        issuer_name="EmissioTrace"
    )
    # Generate QR code
    qr = qrcode.make(provisioning_uri)
    buffered = BytesIO()
    qr.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return secret, qr_base64

def verify_mfa_token(secret: str, token: str) -> bool:
    """Verify TOTP token (6-digit code)."""
    totp = pyotp.TOTP(secret)
    return totp.verify(token, valid_window=1)  # Allow 1 step drift
```

---

## Audit & Compliance Logging#

### Immutable Audit Log (ISO 14067 Requirement)

```python
# models/audit_log.py
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    action = Column(String(50), nullable=False)  # "create", "update", "delete", "export"
    table_name = Column(String(100), nullable=False)
    record_id = Column(UUID(as_uuid=True), nullable=False)
    old_values = Column(JSON, nullable=True)  # Previous state (for updates)
    new_values = Column(JSON, nullable=True)  # New state (for create/update)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)

    # NO updated_at or deleted_at — immutable log!
```

**Critical Compliance Rule:** `audit_logs` table MUST NOT have:

- `updated_at` column (logs are immutable)
- `deleted_at` column (no deletion allowed)
- Any UPDATE/DELETE triggers (database-level protection)

### Audit Log Retention Policy (MinIO Lifecycle)

```xml
<!-- minio-lifecycle-policy.xml -->
<LifecycleConfiguration>
    <Rule>
        <ID>Audit-Log-Retention-7-Years</ID>
        <Status>Enabled</Status>
        <Filter>
            <Prefix>audit-logs/</Prefix>
        </Filter>
        <Transitions>
            <Transition>
                <Days>90</Days>
                <StorageClass>GLACIER</StorageClass>  <!-- Cold storage after 90 days -->
            </Transition>
        </Transitions>
        <Expiration>
            <Days>2555</Days>  <!-- 7 years = 2555 days -->
        </Expiration>
    </Rule>
</LifecycleConfiguration>
```

---

## PCI DSS (Payment Card Data)#

### Current Status: NOT APPLICABLE

EmissioTrace does **NOT** directly process payment cards. Revenue collection handled via:

- **Stripe (EUR payments)** — Stripe handles PCI DSS compliance.
- **Manual bank transfer (ZAR payments)** — No card data stored.

**If future requirement to store cards:** Implement PCI DSS v4.0 requirements:

1. AES-256 encryption for cardholder data
2. Restrict access to card data (need-to-know basis)
3. Annual PCI DSS SAQ D (or A) self-assessment
4. Vulnerability scanning (quarterly)

---

## WotC Fan Content Policy (if applicable)#

### Not Applicable

EmissioTrace is **NOT** using Wizards of the Coast (WotC) intellectual property. No fan content policy requirements.

**However,** if using "Wizards" as a product feature name (data collection wizards), consider renaming to avoid potential trademark confusion. **Recommendation:** Keep "Wizards" as internal codename, use "Guided Data Collection" in marketing materials.

---

## Data Processing Addendum (DPA) for GDP R#

### Template (to be signed with customers)

```markdown
# Data Processing Addendum (DPA)

**Between:**

1. [Customer Name] ("Data Controller")
2. EmissioTrace (Pty) Ltd ("Data Processor")

**Subject Matter:** Processing of personal data for carbon footprint reporting.

**Duration:** Until termination of Main Agreement + 7 years (ISO 14067 retention).

**Controller Obligations:**

- Ensure legal basis for processing (consent or legitimate interest)
- Obtain necessary consents from data subjects (contributors)
- Respond to data subject requests (access, rectification, erasure)

**Processor Obligations:**

- Process data only on documented instructions from Controller
- Ensure personnel engaged in processing are bound by confidentiality
- Assist Controller in responding to data subject requests
- Implement appropriate technical/organizational measures (AES-256, MFA, RLS)
- Notify Controller without undue delay after becoming aware of a personal data breach
- Delete or return all personal data to Controller after end of processing (or retain as required by ISO 14067)

**Cross-Border Transfers:** Allowed to South Africa (adequate protection via POPIA alignment with GDPR).

**Signature:** **\*\*\*\***\_\_\_**\*\*\*\*** Date: **\*\***\_\_\_**\*\***
```

---

## Incident Response Plan (Data Breach)#

### Notification Timeline (GDPR Art. 33 + POPIA Sect. 22)

| Recipient                       | Timeline                               | Method                            | Template                                     |
| ------------------------------- | -------------------------------------- | --------------------------------- | -------------------------------------------- |
| **Information Officer (POPIA)** | **Within 72 hours** of discovery       | Email + Registered Mail           | `templates/breach-notification-popia.md`     |
| **Data Subjects (GDPR/POPIA)**  | **Without undue delay** (if high risk) | Email (BCC) + In-app notification | `templates/breach-notification-users.md`     |
| **Regulator (POPIA)**           | **Within 7 days** of discovery         | Online form (if established)      | `templates/breach-notification-regulator.md` |

### Breach Response Checklist

- [ ] **Containment:** Isolate affected systems (kubectl cordon node)
- [ ] **Assessment:** Determine scope (which tables, which tenants)
- [ ] **Notification:** Information Officer + Regulator (within 72 hours)
- [ ] **Remediation:** Patch vulnerability, rotate all secrets
- [ ] **Post-Mortem:** Blameless retrospective, update security policies

---

## Document History#

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Pre-Launch Security Audit (Month 4)
