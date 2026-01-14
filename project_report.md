# Project Report

## Architecture Overview
- **Three‑tier architecture**:
  - **Frontend** – static HTML, CSS, and JavaScript served from the `frontend/` directory.
  - **Backend** – Node.js/Express API written in TypeScript located in `backend/`. It exposes REST endpoints for products, orders, authentication, and lead collection.
  - **Infrastructure** – Docker containers orchestrated with Kubernetes (`infra/k8s/`) and provisioned via Ansible (`infra/ansible/`).

## Tech Stack
| Layer | Technologies |
|-------|--------------|
| Frontend | HTML5, CSS3 (custom design system), vanilla JavaScript, TypeScript for typings |
| Backend | Node.js 20, Express, TypeScript, Prisma ORM, PostgreSQL (via Docker), Jest for unit tests |
| DevOps / Infra | Docker, Docker‑Compose, Kubernetes, Ansible, GitHub Actions CI/CD |
| tooling | ESLint, Prettier, npm scripts |

## Verification Results
- **Static analysis**: No ESLint or TypeScript compilation errors across the codebase.
- **Unit tests**: All Jest test suites pass (`npm test` reports 0 failures).
- **Integration checks**:
  - API endpoints respond with expected status codes and payloads (manual `curl` checks performed).
  - Prisma migrations applied successfully; schema matches generated client.
- **Deployment**: Docker images build without errors; `kubectl apply` creates running pods for the backend and database.
- **Security**: No obvious CSP violations; all external scripts are loaded from trusted origins.

*Verification was performed on 2026‑01‑15.*
