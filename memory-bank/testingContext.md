# Testing Context: EmissioTrace

## Testing Strategy & Philosophy

### Test Pyramid (Recommended Ratios)

1. **Unit Tests (70%)** — Fast, isolated, no external dependencies.
2. **Integration Tests (20%)** — API endpoint tests with test database.
3. **E2E Tests (10%)** — Playwright browser automation for critical user journeys.

### Testing Principles

- **Fail Fast:** Tests should fail quickly with clear error messages.
- **Deterministic:** No flaky tests — mock external APIs (Mailgun, Clickatell).
- **Isolated:** Each test cleans up after itself (transactions rolled back).
- **Readable:** Test names describe expected behavior (e.g., `test_contributor_cannot_view_other_tenants_data`).

---

## pytest Coverage Targets

### Backend (FastAPI + Pydantic)

| Module               | Coverage Target | Current | Status         |
| -------------------- | --------------- | ------- | -------------- |
| `app/auth/`          | >90%            | 0%      | 🔴 Not Started |
| `app/users/`         | >85%            | 0%      | 🔴 Not Started |
| `app/products/`      | >85%            | 0%      | 🔴 Not Started |
| `app/supply_chains/` | >80%            | 0%      | 🔴 Not Started |
| `app/submissions/`   | >85%            | 0%      | 🔴 Not Started |
| `app/calculations/`  | >90%            | 0%      | 🔴 Not Started |
| `app/exports/`       | >80%            | 0%      | 🔴 Not Started |
| `app/audit/`         | >90%            | 0%      | 🔴 Not Started |
| **Overall Backend**  | **>80%**        | **0%**  | 🔴 Not Started |

### Frontend (Nuxt 3 + Vue 3)

| Module                | Coverage Target | Current | Status         |
| --------------------- | --------------- | ------- | -------------- |
| `app/components/`     | >70%            | 0%      | 🔴 Not Started |
| `app/pages/`          | >60%            | 0%      | 🔴 Not Started |
| `app/stores/` (Pinia) | >80%            | 0%      | 🔴 Not Started |
| `app/utils/`          | >90%            | 0%      | 🔴 Not Started |
| **Overall Frontend**  | **>70%**        | **0%**  | 🔴 Not Started |

---

## Unit Testing Scenarios (pytest)

### Authentication & Authorization

```python
# tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_login_with_valid_credentials():
    """User can login with correct email/password."""
    response = client.post("/api/auth/login", json={
        "email": "admin@example.com",
        "password": "SecurePass123!"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_with_invalid_password():
    """User cannot login with wrong password."""
    response = client.post("/api/auth/login", json={
        "email": "admin@example.com",
        "password": "WrongPassword"
    })
    assert response.status_code == 401

def test_contributor_cannot_access_admin_endpoints():
    """Contributor role cannot access admin-only endpoints."""
    # Login as contributor
    token = get_contributor_token()
    headers = {"Authorization": f"Bearer {token}"}

    # Try to access admin endpoint
    response = client.get("/api/users", headers=headers)
    assert response.status_code == 403  # Forbidden

def test_mfa_verification_required_for_sensitive_actions():
    """MFA must be verified before accessing sensitive endpoints."""
    # Login without MFA
    token = get_user_token_without_mfa()
    headers = {"Authorization": f"Bearer {token}"}

    # Try to export data (sensitive)
    response = client.post("/api/exports/csv", headers=headers)
    assert response.status_code == 403
    assert "MFA required" in response.json()["detail"]
```

### Input Validation (Pydantic)

```python
# tests/test_validation.py
import pytest
from app.schemas.products import ProductCreateSchema

def test_product_sku_must_be_3_to_50_characters():
    """SKU code must be between 3 and 50 characters."""
    # Too short
    with pytest.raises(ValueError, match="length must be between 3 and 50"):
        ProductCreateSchema(sku_code="AB", name="Test Wine", category="wine", volume_liters=750.0)

    # Valid
    product = ProductCreateSchema(sku_code="SB-2025-001", name="Sauvignon Blanc 2025", category="wine", volume_liters=750.0)
    assert product.sku_code == "SB-2025-001"

def test_cultivation_wizard_validates_fertilizer_amount():
    """Fertilizer amount must be positive."""
    from app.schemas.submissions import CultivationData

    with pytest.raises(ValueError, match="greater than 0"):
        CultivationData(
            fertilizer_type="AN (28% N)",
            fertilizer_amount_kg=-5.0,  # Invalid!
            diesel_tractor_liters=10.0,
            yield_per_hectare=8.0,
            cultivated_area_ha=10.0
        )
```

### Calculation Engine (SA-Localized Factors)

```python
# tests/test_calculations.py
import pytest
from app.services.calculations import calculate_co2e

def test_eskom_grid_emission_factor():
    """Eskom grid factor should be ~0.95 kgCO2e/kWh."""
    result = calculate_co2e(
        activity_type="electricity",
        activity_value=10000.0,  # 10,000 kWh
        factor_version="v1.0"
    )
    expected = 10000.0 * 0.95  # 9,500 kgCO2e
    assert abs(result["total_co2e_kg"] - expected) < 0.01

def test_diesel_genset_includes_load_shedding_hours():
    """Diesel calculation must include load-shedding hours explicitly."""
    result = calculate_co2e(
        activity_type="diesel_genset",
        activity_value=500.0,  # 500 liters
        load_shedding_hours=200.0,  # Critical for SA context
        factor_version="v1.0"
    )
    # Diesel combustion factor: ~2.68 kgCO2e/liter
    expected = 500.0 * 2.68
    assert abs(result["total_co2e_kg"] - expected) < 0.01
    assert result["breakdown"]["load_shedding_hours"] == 200.0
```

---

## Integration Testing (API Endpoints)

### Supply Chain Builder Flow

```python
# tests/test_supply_chain_api.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_supply_chain_with_drag_drop_nodes(admin_token):
    """Admin can create supply chain with drag-drop nodes."""
    headers = {"Authorization": f"Bearer {admin_token}"}

    payload = {
        "product_id": "uuid-of-product",
        "name": "Sauvignon Blanc Supply Chain",
        "nodes": [
            {
                "node_type": "cultivation",
                "assigned_contributor_id": "uuid-of-pieter",
                "position": {"x": 100.0, "y": 200.0}
            },
            {
                "node_type": "production",
                "assigned_contributor_id": "uuid-of-winemaker",
                "position": {"x": 300.0, "y": 200.0}
            }
        ]
    }

    response = client.post("/api/supply-chains", json=payload, headers=headers)
    assert response.status_code == 201
    data = response.json()
    assert len(data["nodes"]) == 2
    assert data["nodes"][0]["node_type"] == "cultivation"

def test_contributor_sees_only_assigned_nodes(contributor_token):
    """Contributor can only see nodes assigned to them."""
    headers = {"Authorization": f"Bearer {contributor_token}"}

    response = client.get("/api/supply-chains/{chain_id}", headers=headers)
    assert response.status_code == 200
    data = response.json()

    # Should only see nodes assigned to this contributor
    for node in data["nodes"]:
        assert node["assigned_contributor_id"] == "uuid-of-contributor"
```

### Submission & Audit Trail

```python
# tests/test_submissions_api.py
def test_submission_creates_immutable_audit_log(admin_token, db_session):
    """Every submission creates an immutable audit log entry."""
    headers = {"Authorization": f"Bearer {admin_token}"}

    # Create submission
    payload = {
        "node_id": "uuid-of-node",
        "wizard_data": {
            "cultivation": {
                "fertilizer_type": "AN (28% N)",
                "fertilizer_amount_kg": 500.0,
                "diesel_tractor_liters": 50.0,
                "yield_per_hectare": 8.0,
                "cultivated_area_ha": 10.0
            }
        }
    }

    response = client.post("/api/submissions", json=payload, headers=headers)
    assert response.status_code == 201
    submission_id = response.json()["id"]

    # Check audit log
    audit_logs = db_session.query(AuditLog).filter(
        AuditLog.record_id == submission_id
    ).all()

    assert len(audit_logs) == 1
    assert audit_logs[0].action == "create"
    assert audit_logs[0].table_name == "submissions"

    # Verify audit log is immutable (no updated_at column)
    assert not hasattr(audit_logs[0], "updated_at")
```

---

## End-to-End (E2E) Testing Scenarios (Playwright)

### Critical User Journeys to Automate

| Journey                                                      | Priority | Frequency  | Status         |
| ------------------------------------------------------------ | -------- | ---------- | -------------- |
| **Admin: Register → Create Product → Build Supply Chain**    | P0       | Daily (CI) | 🔴 Not Started |
| **Contributor: Accept Invite → Complete Cultivation Wizard** | P0       | Daily (CI) | 🔴 Not Started |
| **Reviewer: Review Submission → Approve with Badge**         | P1       | Daily (CI) | 🔴 Not Started |
| **Admin: Export Systembolaget CSV → Download**               | P0       | Weekly     | 🔴 Not Started |
| **Admin: View Dashboard with 4-Pillar Breakdown**            | P1       | Weekly     | 🔴 Not Started |

### Playwright Test Example

```python
# tests/e2e/test_contributor_submission.py
import pytest
from playwright.sync_api import Page, expect

def test_contributor_completes_cultivation_wizard(page: Page, base_url: str):
    """Contributor receives invite, accepts, completes wizard."""

    # 1. Contributor receives invite email (mocked)
    invite_token = "mock-invite-token-123"

    # 2. Accept invite
    page.goto(f"{base_url}/accept-invite?token={invite_token}")
    page.fill('[data-testid="password"]', "SecurePass123!")
    page.fill('[data-testid="confirm-password"]', "SecurePass123!")
    page.click('[data-testid="complete-registration"]')

    # 3. Should redirect to wizard
    expect(page).to_have_url(f"{base_url}/wizard/cultivation")

    # 4. Complete wizard
    page.select_option('[data-testid="fertilizer-type"]', "AN (28% N)")
    page.fill('[data-testid="fertilizer-amount"]', "500")
    page.fill('[data-testid="diesel-tractor"]', "50")
    page.fill('[data-testid="yield-per-ha"]', "8")
    page.fill('[data-testid="cultivated-area"]', "10")

    # 5. Upload evidence
    page.set_input_files('[data-testid="evidence-upload"]', "tests/fixtures/fertilizer-invoice.pdf")

    # 6. Submit
    page.click('[data-testid="submit-wizard"]')

    # 7. Should show success
    expect(page.locator('[data-testid="success-message"]')).to_be_visible()
    expect(page.locator('[data-testid="status"]')).to_have_text("Submitted")
```

---

## Performance & Load Testing (k6 Benchmarks)

### API Endpoint Performance Targets

| Endpoint                     | p50 Latency    | p95 Latency | Max RPS | Status         |
| ---------------------------- | -------------- | ----------- | ------- | -------------- |
| `POST /api/auth/login`       | <100ms         | <300ms      | 50      | 🔴 Not Started |
| `GET /api/products`          | <200ms         | <500ms      | 100     | 🔴 Not Started |
| `POST /api/submissions`      | <500ms         | <1s         | 20      | 🔴 Not Started |
| `GET /api/dashboard/summary` | <300ms         | <800ms      | 50      | 🔴 Not Started |
| `POST /api/exports/csv`      | Async (Celery) | N/A         | 5       | 🔴 Not Started |

### k6 Load Test Script

```javascript
import { check, sleep } from "k6";
// tests/load/k6-dashboard-load.js
import http from "k6/http";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "2m", target: 50 }, // Ramp-up to 50 users
    { duration: "5m", target: 50 }, // Stay at 50 users
    { duration: "2m", target: 0 }, // Ramp-down
  ],
  thresholds: [
    ["http_req_duration", "p(95)<500"], // 95% of requests under 500ms
    ["http_req_failure_rate", "<0.01"], // <1% error rate
  ],
};

export default function () {
  const baseUrl = "https://api-staging.emissiotrace.com";
  const token = getToken(); // Helper to get JWT

  // Test dashboard endpoint
  const response = http.get(`${baseUrl}/api/dashboard/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(response, {
    "status is 200": r => r.status === 200,
    "response time < 500ms": r => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1); // 1 second between requests
}
```

---

## Edge Case Handling Verifications

### Data Quality Edge Cases

| Edge Case                | Test Scenario                                                     | Expected Behavior                                                 | Status         |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------- | -------------- |
| **Missing Data Points**  | Contributor submits wizard with empty required fields             | Return 400 with field-specific errors                             | 🔴 Not Started |
| **Conflicting Data**     | Contributor submits 10 tons CO2e, but last year was 15 tons       | Flag warning: "Previous year: 15 tons. Reason for 33% reduction?" | 🔴 Not Started |
| **Evidence Mismatch**    | Pieter uploads invoice showing 500kg fertilizer, but inputs 400kg | OCR should flag mismatch; Reviewer sees discrepancy               | 🔴 Not Started |
| **Duplicate Submission** | Contributor submits same wizard twice                             | Second submission updates first (versioning)                      | 🔴 Not Started |

### Technical Edge Cases

| Edge Case                         | Test Scenario                                           | Expected Behavior                                                             | Status                   |
| --------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------ |
| **Offline Contributor**           | Pieter has no internet at vineyard                      | PWA caches data locally; syncs when online                                    | 🔴 Not Started (Phase 2) |
| **Language Switching Mid-Wizard** | Pieter starts in Afrikaans, switches to English halfway | Language preference persisted per user; not per session                       | 🔴 Not Started           |
| **Contributor Leaves Company**    | Pieter retires, new manager takes over                  | Admin re-assigns node; audit trail shows "Pieter (2024) → New Manager (2025)" | 🔴 Not Started           |
| **Token Expiry**                  | Contributor clicks invite link after 30 days            | Return 401 "Token expired"; Admin can resend invite                           | 🔴 Not Started           |
| **Celery Task Failure**           | CSV export fails due to database timeout                | Task retried 3 times with exponential backoff; admin notified                 | 🔴 Not Started           |

---

## Test Environment Configuration

### Local Development (Docker Compose)

```yaml
# docker-compose.test.yml
version: "3.8"

services:
  postgres-test:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
      POSTGRES_DB: emissiotrace_test
    ports:
      - "5433:5432" # Different port to avoid conflict
    command: -c fsync=off -c full_page_writes=off # Faster for tests

  redis-test:
    image: redis:7-alpine
    ports:
      - "6380:6379"

  minio-test:
    image: minio/minio:latest
    environment:
      MINIO_ROOT_USER: testaccess
      MINIO_ROOT_PASSWORD: testsecret
    ports:
      - "9002:9000"
      - "9003:9001"
    command: server /data --console-address ":9001"
```

### CI/CD Test Execution

```yaml
# .github/workflows/test.yml ( excerpt)
test_backend:
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:16-alpine
      env:
        POSTGRES_USER: testuser
        POSTGRES_PASSWORD: testpass
        POSTGRES_DB: emissiotrace_test
      ports:
        - 5432/tcp
    redis:
      image: redis:7-alpine
      ports:
        - 6379/tcp

  steps:
    - name: Run pytest with coverage
      run: |
        cd api
        pytest tests/ -v --cov=app --cov-report=term-missing --cov-fail-under=80

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v4
      with:
        file: ./api/coverage.xml
```

---

## Document History

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Post-MVP Launch (Month 6)
