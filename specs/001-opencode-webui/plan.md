# Implementation Plan: OpenCode WebUI Monorepo

**Branch**: `001-opencode-webui` | **Date**: 2026-01-23 | **Spec**: `/home/zhangxiao/frontend/specs/001-opencode-webui/spec.md`
**Input**: Feature specification from `/specs/001-opencode-webui/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

创建一个单仓库，包含 React + TypeScript 的前端应用与 Koa Node.js 服务骨架。前端提供连接 OpenCode Server 的初始连接页，连接后显示三栏布局（左右侧边栏可折叠），左侧按项目分组展示会话列表，中间展示会话内容并支持输入消息，右侧预留代码视图占位。Node 服务提供最小接口（如健康检查/版本元信息），用于满足跨边界集成与接口稳定性要求；HTTP(S)+WebSocket/SSE 通信由前端直接接入 OpenCode Server。

## Technical Context

**Language/Version**: TypeScript (frontend + backend), Node.js (LTS, version TBD)  
**Primary Dependencies**: React, Vite (frontend); Koa, @koa/router (backend)  
**Storage**: N/A (frontend直接调用 OpenCode Server；本阶段不落库)  
**Testing**: Vitest + React Testing Library (frontend); Jest (backend, skeleton)  
**Target Platform**: Desktop Web (Chrome/Edge)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: 初次连接后会话列表 2 秒内呈现 (SC-002)  
**Constraints**: 无认证直连；HTTP(S)+WebSocket（SSE 不采用）；避免 node_modules 直接编辑  
**Scale/Scope**: 单一桌面 Web 应用 + Node 服务骨架

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Monorepo boundaries respected; frontend/backend interfaces documented
- Type safety enforced (no `any`, no type suppression)
- Shell execution safety for Node service (allowlist, timeouts, output handling) — deferred in this phase; spec documents scope boundary and next phase will introduce it
- Koa service remains unauthenticated unless the spec explicitly adds auth
- No direct edits in `node_modules`; dependency changes via package manager

## Project Structure

### Documentation (this feature)

```text
specs/001-opencode-webui/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
OpenCode-WebUI/
├── apps/
│   ├── web/                # React + TS frontend (Vite)
│   └── server/             # Koa backend skeleton
├── packages/
│   ├── shared/             # shared types/interfaces (client-server boundary)
│   └── ui/                 # shared UI primitives (optional)
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── turbo.json              # optional (if turbo adopted)
```

**Structure Decision**: 采用 apps/ + packages/ 的 monorepo 结构（参考仓库内 Vite React 项目与 Koa 服务示例），确保前后端边界清晰；共享类型通过 packages/shared 维护，避免跨层耦合。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Outline & Research

### Technical Unknowns

- OpenCode Server 的 HTTP API 与 WebSocket 协议细节（会话列表、消息、事件名与 payload）
- 现有 OpenCode WebUI 参考布局与交互（是否有公开实现可参照）

### Research Tasks

1. Research OpenCode Server API (HTTP/WS) endpoints and payloads for sessions/messages
2. Research OpenCode WebUI layout patterns and navigation (if open source)
3. Confirm recommended monorepo tooling (pnpm vs yarn workspaces) for TS + React + Koa

### Phase 0 Output: `research.md`

## Phase 1: Design & Contracts

### Data Model

- ServerConnection
  - id: string
  - serverUrl: string
  - protocol: 'http' | 'https'
  - status: 'disconnected' | 'connecting' | 'connected' | 'error'
  - lastError?: string
  - transport: 'http' | 'ws' | 'both'

- Project
  - id: string
  - name: string
  - sessions: SessionSummary[]

- SessionSummary
  - id: string
  - title: string
  - updatedAt: string (ISO)
  - preview?: string

- Message
  - id: string
  - sessionId: string
  - sender: 'user' | 'assistant' | 'system'
  - content: string
  - createdAt: string (ISO)
  - order: number

### API Contracts

- GET /session
  - Response: Session[] (按 projectID 在前端分组)
- GET /session/:id/message
  - Response: { info: Message, parts: Part[] }[]
- POST /session/:id/message
  - Request: SendMessageRequest
  - Response: { info: Message, parts: Part[] }
- GET /event (SSE)
  - 说明: 本阶段不采用，保留为后续扩展
- GET /pty/:id/connect (WebSocket, reserved)
  - 说明: 仅用于终端 PTY，当前阶段不接入
- WebSocket /event (primary)
  - Events: message.updated, message.part.updated, session.error, session.idle

### Node Service Integration (Minimal)

- GET /health
  - Response: { status: 'ok', version: string, timestamp: string }
  - Purpose: frontend health check + version metadata

### UX Flow

1. 初始连接页面：输入 Server URL → 连接 → 成功进入主布局
   - 失败时显示错误类型（地址非法 / 服务器不可达 / 服务器错误）与重试提示
2. 左侧：项目分组 + 会话列表；支持折叠
3. 中间：会话内容 + 输入框
4. 右侧：代码视图占位

### Phase 1 Output

- `data-model.md`
- `contracts/*`
- `quickstart.md`

## Phase 2: Planning

Stop after Phase 2 planning per command instructions.
