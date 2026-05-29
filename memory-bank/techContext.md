# Technology Context: EmissioTrace

## Technology Stack

### Backend Stack

| Component           | Technology                  | Version | Justification                                                            |
| ------------------- | --------------------------- | ------- | ------------------------------------------------------------------------ |
| **Framework**       | FastAPI                     | 0.115+  | High performance, auto-generated OpenAPI docs, Pydantic v2 validation    |
| **Language**        | Python                      | 3.11+   | Rich ecosystem for data processing (NumPy, Pandas), mature LCA libraries |
| **ORM**             | SQLAlchemy                  | 2.0+    | Async support, mature, excellent PostgreSQL integration                  |
| **Validation**      | Pydantic v2                 | 2.10+   | Fast validation, auto-generated API docs, type safety                    |
| **Authentication**  | FastAPI-Users or custom JWT | -       | MFA support, role-based access                                           |
| **Task Queue**      | Celery                      | 5.3+    | Industry standard for background tasks, Redis broker                     |
| **Task Monitoring** | Flower                      | 2.0+    | Celery task monitoring dashboard                                         |

### Frontend Stack

| Component            | Technology               | Version | Justification                                                   |
| -------------------- | ------------------------ | ------- | --------------------------------------------------------------- |
| **Framework**        | Nuxt 3                   | 3.14+   | SSR/SSG, built-in i18n, excellent DX, Vue 3 composition API     |
| **UI Library**       | Nuxt UI v3               | 3.0+    | Pre-built components, Tailwind CSS integration, accessibility   |
| **Styling**          | Tailwind CSS             | 3.4+    | Utility-first, rapid prototyping, small bundle size             |
| **State Management** | Pinia                    | 2.2+    | Vue 3 official, TypeScript support, devtools integration        |
| **HTTP Client**      | ofetch (Nuxt 3 built-in) | -       | Auto-handles SSR/CSR, TypeScript support                        |
| **i18n**             | Nuxt i18n                | 8.0+    | Bilingual support (English/Afrikaans), runtime locale switching |

### Database & Storage

| Component                | Technology | Version       | Justification                                              |
| ------------------------ | ---------- | ------------- | ---------------------------------------------------------- |
| **Relational DB**        | PostgreSQL | 16+           | Row-level security (RLS), JSONB support, mature ecosystem  |
| **Object Storage**       | MinIO      | RELEASE.2024+ | S3-compatible, self-hosted, AES-256 encryption             |
| **Cache/Message Broker** | Redis      | 7.2+          | Celery broker, session storage, caching                    |
| **Connection Pooling**   | PgBouncer  | 1.22+         | PostgreSQL connection pooling (recommended for production) |

### Infrastructure & Deployment

| Component                   | Technology                                             | Version | Justification                                           |
| --------------------------- | ------------------------------------------------------ | ------- | ------------------------------------------------------- |
| **Container Orchestration** | k3s (lightweight Kubernetes)                           | 1.31+   | Low resource usage, easy management, production-grade   |
| **Container Runtime**       | containerd                                             | 1.7+    | Kubernetes default, stable                              |
| **Reverse Proxy**           | Nginx                                                  | 1.27+   | SSL termination, static file serving, reverse proxy     |
| **Infrastructure Provider** | Teraco Data Centres                                    | -       | SA-local hosting, Tier III+ certified, data sovereignty |
| **CI/CD**                   | GitLab Self-Hosted or GitHub Actions                   | -       | Founder preference, mature ecosystem                    |
| **Container Registry**      | GitLab Container Registry or GitHub Container Registry | -       | Integrated with CI/CD                                   |

---

## Environment Configurations

### Environment Variables (BACKEND - FastAPI)

```bash
# .env.example (Backend)

# Application
APP_NAME=EmissioTrace API
APP_VERSION=1.0.0
DEBUG=False
ENVIRONMENT=production  # or "development"

# Security
SECRET_KEY=your-super-secret-key-here  # JWT signing key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
MFA_ISSUER_NAME=EmissioTrace

# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/emissiotrace
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=10

# Redis (Celery Broker + Cache)
REDIS_URL=redis://localhost:6379/0
REDIS_CACHE_URL=redis://localhost:6379/1

# MinIO (Object Storage)
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET_NAME=emissiotrace-docs
MINIO_SECURE=True  # False for development

# Email (Mailgun)
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=emissiotrace.com
EMAIL_FROM=noreply@emissiotrace.com

# SMS (Clickatell)
CLICKATELL_API_KEY=your-clickatell-api-key
SMS_FROM=EmissioTrace

# WhatsApp Business API (Optional - Phase 2)
WHATSAPP_API_TOKEN=your-whatsapp-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id

# CORS
BACKEND_CORS_ORIGINS=["https://app.emissiotrace.com"]

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60

# Factor Library
FACTOR_LIBRARY_VERSION=v1.0
ECOINVENT_LICENSE_PATH=/path/to/ecoinvent.lic

# Logging
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR, CRITICAL
SENTRY_DSN=your-sentry-dsn  # Optional: Error tracking
```

### Environment Variables (FRONTEND - Nuxt 3)

```bash
# .env.example (Frontend)

# Application
NUXT_PUBLIC_APP_NAME=EmissioTrace
NUXT_PUBLIC_APP_VERSION=1.0.0
NUXT_PUBLIC_API_BASE_URL=https://api.emissiotrace.com
NUXT_PUBLIC_API_TIMEOUT=30000  # 30 seconds

# i18n
NUXT_PUBLIC_DEFAULT_LOCALE=en
NUXT_PUBLIC_SUPPORTED_LOCALES=en,af

# Features
NUXT_PUBLIC_ENABLE_MFA=true
NUXT_PUBLIC_ENABLE_OFFLINE_MODE=false  # Phase 2
NUXT_PUBLIC_MAX_FILE_UPLOAD_SIZE_MB=10

# Maps (Optional - for supply chain visualization)
NUXT_PUBLIC_MAPS_API_KEY=your-maps-api-key

# Analytics (Optional)
NUXT_PUBLIC_GA_ID=your-google-analytics-id  # Or use Plausible/Umami for EU compliance
```

---

## Local Development Setup

### Prerequisites

- Docker & Docker Compose (for local services)
- Python 3.11+
- Node.js 20+ (LTS)
- pnpm (preferred) or npm

### Backend Setup (FastAPI)

```bash
# 1. Clone repository
git clone git@github.com:kynthosdev/emissiotrace.git
cd emissiotrace/api

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Dev dependencies (pytest, ruff, etc.)

# 4. Set up pre-commit hooks
pre-commit install

# 5. Start local services (PostgreSQL, Redis, MinIO)
docker-compose -f docker-compose.dev.yml up -d

# 6. Run migrations
alembic upgrade head

# 7. Seed factor library (EcoInvent + SA-specific factors)
python scripts/seed_factor_library.py --version v1.0

# 8. Start development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# Alternative: Use FastAPI's built-in reload
# fastapi dev main.py

# 9. Access API docs
# Swagger UI: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

### Frontend Setup (Nuxt 3)

```bash
# 1. Navigate to frontend directory
cd emissiotrace/app

# 2. Install dependencies
pnpm install  # or: npm install

# 3. Set up environment variables
cp .env.example .env  # Edit .env with local values

# 4. Start development server
pnpm dev  # or: npm run dev
# App runs at: http://localhost:3000

# 5. Build for production (test build locally)
pnpm build
pnpm preview  # Preview production build locally
```

### Docker Compose (Local Services)

```yaml
# docker-compose.dev.yml
version: "3.8"

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpassword
      POSTGRES_DB: emissiotrace_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

  minio:
    image: minio/minio:latest
    environment:
      MINIO_ROOT_USER: devaccesskey
      MINIO_ROOT_PASSWORD: devsecretkey
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

  celery_worker:
    build: ./api
    command: celery -A main.celery worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql+asyncpg://devuser:devpassword@postgres:5432/emissiotrace_dev
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis

  celery_beat:
    build: ./api
    command: celery -A main.celery beat --loglevel=info
    environment:
      - DATABASE_URL=postgresql+asyncpg://devuser:devpassword@postgres:5432/emissiotrace_dev
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  minio_data:
```

---

## CI/CD Pipeline

### GitLab CI/CD (Self-Hosted) - Recommended

```yaml
# .gitlab-ci.yml

stages:
  - test
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""

# Backend Testing
test_backend:
  stage: test
  image: python:3.11-slim
  before_script:
    - pip install -r api/requirements.txt -r api/requirements-dev.txt
  script:
    - cd api
    - pytest tests/ -v --cov=app --cov-report=term-missing
    - ruff check . # Linting
    - mypy . # Type checking
  only:
    - merge_requests
    - main

# Frontend Testing
test_frontend:
  stage: test
  image: node:20-alpine
  before_script:
    - cd app && pnpm install
  script:
    - pnpm test # Vitest unit tests
    - pnpm lint # ESLint
    - pnpm typecheck # TypeScript type checking
  only:
    - merge_requests
    - main

# Build Docker Images
build_backend:
  stage: build
  image: docker:24-cli
  services:
    - docker:24-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY/emissiotrace/api:latest -f docker/Dockerfile.backend .
    - docker push $CI_REGISTRY/emissiotrace/api:latest
  only:
    - main

build_frontend:
  stage: build
  image: docker:24-cli
  services:
    - docker:24-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY/emissiotrace/app:latest -f docker/Dockerfile.frontend .
    - docker push $CI_REGISTRY/emissiotrace/app:latest
  only:
    - main

# Deploy to Teraco (k3s)
deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
    - curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    - chmod +x kubectl && mv kubectl /usr/local/bin/
    - echo $KUBE_CONFIG | base64 -d > ~/.kube/config
  script:
    - kubectl set image deployment/api-deployment api=$CI_REGISTRY/emissiotrace/api:latest -n emissiotrace
    - kubectl set image deployment/app-deployment app=$CI_REGISTRY/emissiotrace/app:latest -n emissiotrace
    - kubectl rollout status deployment/api-deployment -n emissiotrace
    - kubectl rollout status deployment/app-deployment -n emissiotrace
  only:
    - main
  when: manual # Require manual approval for production deploys
```

### GitHub Actions (Alternative)

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test_backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - name: Install dependencies
        run: |
          cd api
          pip install -r requirements.txt -r requirements-dev.txt
      - name: Run tests
        run: |
          cd api
          pytest tests/ -v --cov=app --cov-report=term-missing
          ruff check .
          mypy .

  test_frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: pnpm
      - name: Install dependencies
        run: |
          cd app
          pnpm install
      - name: Run tests
        run: |
          cd app
          pnpm test
          pnpm lint
          pnpm typecheck

  build_and_deploy:
    needs: [test_backend, test_frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push Docker images
        run: |
          docker build -t ghcr.io/kynthosdev/emissiotrace/api:latest -f docker/Dockerfile.backend .
          docker push ghcr.io/kynthosdev/emissiotrace/api:latest
          docker build -t ghcr.io/kynthosdev/emissiotrace/app:latest -f docker/Dockerfile.frontend .
          docker push ghcr.io/kynthosdev/emissiotrace/app:latest
      - name: Deploy to Teraco (k3s)
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > ~/.kube/config
          kubectl set image deployment/api-deployment api=ghcr.io/kynthosdev/emissiotrace/api:latest -n emissiotrace
          kubectl set image deployment/app-deployment app=ghcr.io/kynthosdev/emissiotrace/app:latest -n emissiotrace
          kubectl rollout status deployment/api-deployment -n emissiotrace
          kubectl rollout status deployment/app-deployment -n emissiotrace
```

---

## Secrets Management

### Production Secrets (Teraco k3s)

```bash
# Using kubectl to create secrets

# 1. Database credentials
kubectl create secret generic postgres-credentials \
  --from-literal=username=produser \
  --from-literal=password=your-secure-password \
  -n emissiotrace

# 2. JWT secret key
kubectl create secret generic jwt-secret \
  --from-literal=secret-key=your-super-secret-jwt-key \
  -n emissiotrace

# 3. MinIO credentials
kubectl create secret generic minio-credentials \
  --from-literal=access-key=your-production-access-key \
  --from-literal=secret-key=your-production-secret-key \
  -n emissiotrace

# 4. Mailgun API key
kubectl create secret generic mailgun-credentials \
  --from-literal=api-key=your-mailgun-api-key \
  -n emissiotrace

# 5. Clickatell API key (SMS)
kubectl create secret generic clickatell-credentials \
  --from-literal=api-key=your-clickatell-api-key \
  -n emissiotrace

# 6. EcoInvent license path (mounted as volume)
kubectl create secret generic ecionvent-license \
  --from-file=license-file=/path/to/ecoinvent.lic \
  -n emissiotrace
```

### Accessing Secrets in Application

```python
# FastAPI (Backend) - Accessing Kubernetes secrets
import os
from kubernetes import client, config

def get_secret(secret_name: str, key: str) -> str:
    """Fetch secret from Kubernetes."""
    config.load_incluster_config()  # Only works inside k8s cluster
    v1 = client.CoreV1Api()
    secret = v1.read_namespaced_secret(secret_name, "emissiotrace")
    return secret.data[key].decode('utf-8')

# Alternative: Use environment variables (recommended)
# Set secrets as environment variables in k8s deployment manifest
DATABASE_URL = os.getenv("DATABASE_URL")  # From k8s secret → env var
```

---

## Monitoring & Observability

### Stack

| Component              | Technology                | Purpose                                            |
| ---------------------- | ------------------------- | -------------------------------------------------- |
| **Metrics Collection** | Prometheus                | Time-series metrics (CPU, memory, request latency) |
| **Visualization**      | Grafana                   | Dashboards for system health, business metrics     |
| **Logging**            | Loki + Promtail           | Centralized log aggregation                        |
| **Alerting**           | Alertmanager (Prometheus) | Alert on critical metrics (e.g., high error rate)  |
| **Error Tracking**     | Sentry                    | Application error tracking (optional, paid)        |
| **Uptime Monitoring**  | Custom status page        | Public status page for customers                   |

### Key Metrics to Monitor

1. **System Metrics:**
   - CPU usage per pod (target: < 70%)
   - Memory usage per pod (target: < 80%)
   - Disk usage (MinIO, PostgreSQL) (target: < 80%)
   - Network latency (target: < 100ms SA-local)

2. **Application Metrics:**
   - HTTP request latency (p50, p95, p99) (target: p95 < 500ms)
   - HTTP error rate (target: < 1%)
   - Celery task success/failure rate (target: > 95% success)
   - Database connection pool usage (target: < 80%)

3. **Business Metrics:**
   - Active tenants (growth tracking)
   - Submissions per day (engagement)
   - CSV/PDF export count (feature usage)
   - Contributor invite acceptance rate (target: > 70%)

### Grafana Dashboard Example (JSON)

```json
{
  "dashboard": {
    "title": "EmissioTrace - System Overview",
    "panels": [
      {
        "title": "HTTP Request Rate",
        "type": "timeseries",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Celery Task Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(celery_tasks_succeeded_total[5m])) / sum(rate(celery_tasks_total[5m]))"
          }
        ]
      },
      {
        "title": "Database Connections",
        "type": "timeseries",
        "targets": [
          {
            "expr": "pg_stat_activity_count / pg_max_connections"
          }
        ]
      }
    ]
  }
}
```

---

## Infrastructure Limits & Scaling

### Current Limits (MVP Phase)

| Resource                   | Limit                                       | Justification                                  |
| -------------------------- | ------------------------------------------- | ---------------------------------------------- |
| **PostgreSQL Connections** | 100 (pool_size=20, max_overflow=10, 4 pods) | Sufficient for ~50 tenants                     |
| **Redis Memory**           | 2GB                                         | Sufficient for session + task queue            |
| **MinIO Storage**          | 1TB                                         | Sufficient for ~100K documents (avg 10MB each) |
| **Celery Workers**         | 2 workers, 4 concurrent tasks each          | Sufficient for ~100 submissions/day            |
| **k3s Nodes**              | 3 nodes (8 vCPU, 32GB RAM each)             | HA with pod replication                        |

### Scaling Triggers

| Metric                       | Threshold            | Action                                      |
| ---------------------------- | -------------------- | ------------------------------------------- |
| **HTTP 5xx Error Rate**      | > 1% for 5 minutes   | Alert DevOps, investigate                   |
| **Celery Task Queue Length** | > 100 pending tasks  | Scale Celery workers (+1 pod)               |
| **PostgreSQL CPU**           | > 70% for 10 minutes | Scale read replicas (+1)                    |
| **MinIO Storage**            | > 80% capacity       | Add storage volume or archive old documents |
| **Memory Usage per Pod**     | > 80%                | Increase pod memory limit or optimize code  |

---

## Disaster Recovery (DR) Procedures

### Backup Schedule

| Component              | Backup Frequency                        | Retention      | Storage Location                  |
| ---------------------- | --------------------------------------- | -------------- | --------------------------------- |
| **PostgreSQL**         | Daily full backup + WAL streaming       | 30 days        | MinIO (cross-region replica)      |
| **MinIO**              | Daily bucket replication                | 30 days        | Second Teraco data centre         |
| **Redis**              | AOF persistence (snapshot every 15 min) | 15 minutes RPO | Local disk + cross-region replica |
| **Kubernetes Configs** | GitOps (every change committed)         | Indefinite     | Git repository                    |

### Recovery Procedures

1. **PostgreSQL Recovery:**

   ```bash
   # 1. Identify recovery point (e.g., accidental data deletion at 14:30)
   # 2. Restore from daily backup (e.g., 2026-05-27 02:00)
   pg_restore --clean --create -d emissiotrace_restore backup_2026-05-27.dump

   # 3. Apply WAL logs up to recovery point (14:29)
   pg_wal_replay_resume_until('2026-05-27 14:29:00 UTC')

   # 4. Verify data integrity
   psql emissiotrace_restore -c "SELECT COUNT(*) FROM submissions;"

   # 5. Swap database connections to restored instance
   kubectl set env deployment/api-deployment DATABASE_URL=postgresql+asyncpg://user:pass@restored-db:5432/emissiotrace_restore
   ```

2. **MinIO Recovery:**

   ```bash
   # 1. Identify lost objects (e.g., accidental deletion)
   # 2. Restore from cross-region replica (Teraco JHB → CPT)
   mc mirror --overwrite teraco-jhb/emissiotrace-docs teraco-cpt/emissiotrace-docs

   # 3. Verify object integrity (checksum comparison)
   mc diff teraco-jhb/emissiotrace-docs teraco-cpt/emissiotrace-docs
   ```

3. **Celery Task Recovery:**
   - Tasks are idempotent (safe to re-run)
   - Re-queue failed tasks from Celery Dead Letter Queue (DLQ)

   ```bash
   # View failed tasks
   celery -A main.celery inspect reserved

   # Re-queue failed tasks
   celery -A main.celery control revoke <task_id> --terminate
   ```

---

## Development Workflow

### Git Flow

```
main (production-ready)
  ↑
  │ Merge (after PR approval + CI passes)
  │
develop (integration branch)
  ↑
  │ Feature merge
  │
feature/* (e.g., feature/supply-chain-builder)
  │
  │ Branch from develop
  │
  └─→ Developer's fork
```

### Commit Message Convention (Conventional Commits)

```
feat: Add supply chain drag-drop builder
fix: Resolve token expiration issue in contributor invites
docs: Update API documentation for /api/exports endpoint
test: Add unit tests for calculation engine
chore: Upgrade FastAPI to 0.115.0
refactor: Optimize PostgreSQL query for dashboard endpoint
```

### Code Review Checklist

- [ ] Code follows style guide (PEP 8 for Python, ESLint for TypeScript)
- [ ] Tests added/updated (target: > 80% coverage)
- [ ] Documentation updated (API docs, README, etc.)
- [ ] Security review (no secrets committed, input validation)
- [ ] Performance review (N+1 queries, unnecessary loops)
- [ ] Accessibility review (frontend only, WCAG 2.1 AA compliance)

---

## Document History

- **Created:** 2026-05-28
- **Version:** 1.0
- **Authors:** Cline (AI Engineer)
- **Approved By:** Pending
- **Next Review:** Post-Infrastructure Setup (Month 1)
