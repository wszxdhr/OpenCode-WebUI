# Phase 1 Quickstart: OpenCode WebUI Monorepo

## Prerequisites

- Node.js LTS
- pnpm (recommended)
- OpenCode Server running locally (default: http://localhost:4096)

## Local Setup

1. Clone / enter repo
2. From repo root, initialize monorepo (planned layout)

```bash
# create structure
mkdir -p OpenCode-WebUI/apps/web OpenCode-WebUI/apps/server OpenCode-WebUI/packages/shared
```

3. Configure workspaces (planned)

```yaml
# OpenCode-WebUI/pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

4. Start OpenCode Server

```bash
opencode serve --port 4096
```

## Frontend Development

- Connect to server at `http://localhost:4096`
- Use SSE endpoint `/event` for session/message updates
- Fetch sessions via `GET /session`
- Fetch messages via `GET /session/:id/message`
- Send messages via `POST /session/:id/message`

## Backend Skeleton

- Koa server is a scaffold only (no business logic)
- Keep unauthenticated by default
- Use allowlist + timeout if shell execution is added

## Verification

- Open the app and connect to server
- Confirm sessions list loads
- Confirm message list renders and new message appears
