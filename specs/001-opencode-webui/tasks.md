---
description: 'Task list for OpenCode WebUI Monorepo'
---

# Tasks: OpenCode WebUI Monorepo

**Input**: Design documents from `/specs/001-opencode-webui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 添加自动验收脚本任务以覆盖 SC-001/SC-002。

**Constitution Gates**: 包含 TypeScript 类型安全检查、Shell 执行安全边界、单仓边界（shared 包）等任务。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目初始化与基础结构搭建

- [ ] T001 Create monorepo directories at `OpenCode-WebUI/apps/web`, `OpenCode-WebUI/apps/server`, `OpenCode-WebUI/packages/shared`
- [ ] T002 Add workspace config `OpenCode-WebUI/pnpm-workspace.yaml`
- [ ] T003 Add root package manifest `OpenCode-WebUI/package.json`
- [ ] T004 Add base TypeScript config `OpenCode-WebUI/tsconfig.base.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 所有用户故事实现的前置基础设施

- [ ] T005 [P] Scaffold shared package manifest `OpenCode-WebUI/packages/shared/package.json`
- [ ] T006 [P] Add shared package entry `OpenCode-WebUI/packages/shared/src/index.ts`
- [ ] T007 [P] Scaffold web app manifest `OpenCode-WebUI/apps/web/package.json`
- [ ] T008 [P] Add Vite config `OpenCode-WebUI/apps/web/vite.config.ts`
- [ ] T009 [P] Add web TypeScript config `OpenCode-WebUI/apps/web/tsconfig.json`
- [ ] T010 [P] Add web HTML entry `OpenCode-WebUI/apps/web/index.html`
- [ ] T011 [P] Add web bootstrap `OpenCode-WebUI/apps/web/src/main.tsx`
- [ ] T012 [P] Add web app shell `OpenCode-WebUI/apps/web/src/App.tsx`
- [ ] T013 [P] Scaffold server manifest `OpenCode-WebUI/apps/server/package.json`
- [ ] T014 [P] Add server TypeScript config `OpenCode-WebUI/apps/server/tsconfig.json`
- [ ] T015 [P] Add Koa skeleton (no auth) `OpenCode-WebUI/apps/server/src/app.ts`
- [ ] T016a Add health/meta endpoint `GET /health` `OpenCode-WebUI/apps/server/src/routes/health.ts`
- [ ] T016b Wire health route into Koa app `OpenCode-WebUI/apps/server/src/app.ts`
- [ ] T017 Add OpenCode API types `OpenCode-WebUI/packages/shared/src/opencode.ts`
- [ ] T018 Add API client wrapper `OpenCode-WebUI/apps/web/src/services/opencodeClient.ts`
- [ ] T019 Add WebSocket event stream wrapper `OpenCode-WebUI/apps/web/src/services/eventStream.ts`
- [ ] T020 Add session/connection store `OpenCode-WebUI/apps/web/src/store/sessionStore.ts`
- [ ] T020a Add health check client `OpenCode-WebUI/apps/web/src/services/healthClient.ts`
- [ ] T020b Add shared type imports via path alias `OpenCode-WebUI/apps/web/tsconfig.json`
- [ ] T020c Use health check to validate Node service availability `OpenCode-WebUI/apps/web/src/services/healthClient.ts`

**Checkpoint**: Foundation ready — user stories can begin

---

## Phase 3: User Story 1 - 连接到服务器并看到会话列表 (Priority: P1) 🎯 MVP

**Goal**: 提供连接页并加载按项目分组的会话列表

**Independent Test**: 输入有效服务器地址后，连接成功并展示按项目分组的会话列表；连接失败可重试

### Implementation for User Story 1

- [ ] T021 [US1] Create connect page `OpenCode-WebUI/apps/web/src/pages/ConnectPage.tsx`
- [ ] T022 [P] [US1] Add connect page styles `OpenCode-WebUI/apps/web/src/styles/connect.css`
- [ ] T023 [US1] Wire connect flow to store `OpenCode-WebUI/apps/web/src/store/sessionStore.ts`
- [ ] T023a [US1] Add connection error classification (invalid URL/unreachable/server error) `OpenCode-WebUI/apps/web/src/store/sessionStore.ts`
- [ ] T023b [US1] Render connection error messaging with retry guidance `OpenCode-WebUI/apps/web/src/pages/ConnectPage.tsx`
- [ ] T024 [P] [US1] Add session grouping helper `OpenCode-WebUI/apps/web/src/utils/groupSessions.ts`
- [ ] T025 [US1] Build session list component `OpenCode-WebUI/apps/web/src/components/SessionList.tsx`
- [ ] T026 [US1] Render left sidebar with sessions `OpenCode-WebUI/apps/web/src/components/LeftSidebar.tsx`
- [ ] T027 [US1] Handle error/empty states in list `OpenCode-WebUI/apps/web/src/components/SessionList.tsx`
- [ ] T028 [US1] Switch connect vs main screen `OpenCode-WebUI/apps/web/src/App.tsx`

**Checkpoint**: User Story 1 可独立完成并验证

---

## Phase 4: User Story 2 - 在三栏布局中浏览与折叠侧边栏 (Priority: P2)

**Goal**: 实现三栏布局与左右侧边栏折叠，左侧包含项目/会话/设置入口

**Independent Test**: 连接后可折叠左右侧边栏，中间会话区域可用

### Implementation for User Story 2

- [ ] T029 [US2] Create main layout container `OpenCode-WebUI/apps/web/src/layout/MainLayout.tsx`
- [ ] T030 [P] [US2] Add collapsible sidebar state `OpenCode-WebUI/apps/web/src/layout/MainLayout.tsx`
- [ ] T031 [P] [US2] Add left view tabs `OpenCode-WebUI/apps/web/src/components/LeftNav.tsx`
- [ ] T032 [US2] Add right sidebar placeholder `OpenCode-WebUI/apps/web/src/components/RightSidebar.tsx`
- [ ] T033 [US2] Add layout styles `OpenCode-WebUI/apps/web/src/styles/layout.css`

**Checkpoint**: User Story 2 可独立完成并验证

---

## Phase 5: User Story 3 - 查看会话内容并输入消息 (Priority: P3)

**Goal**: 选择会话后加载消息列表并支持输入发送

**Independent Test**: 选择会话后显示内容；发送消息后出现新消息

### Implementation for User Story 3

- [ ] T034 [US3] Add message list component `OpenCode-WebUI/apps/web/src/components/MessageList.tsx`
- [ ] T035 [US3] Fetch messages on session select `OpenCode-WebUI/apps/web/src/store/sessionStore.ts`
- [ ] T036 [P] [US3] Add message input component `OpenCode-WebUI/apps/web/src/components/MessageInput.tsx`
- [ ] T037 [US3] Wire send message API `OpenCode-WebUI/apps/web/src/services/opencodeClient.ts`
- [ ] T038 [US3] Apply WebSocket message updates `OpenCode-WebUI/apps/web/src/services/eventStream.ts`

**Checkpoint**: User Story 3 可独立完成并验证

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事优化与合规检查

- [ ] T039 [P] Add shared empty/loading UI `OpenCode-WebUI/apps/web/src/components/EmptyState.tsx`
- [ ] T040 [P] Ensure strict type safety `OpenCode-WebUI/tsconfig.base.json`
- [ ] T041 Document unauthenticated server skeleton in `OpenCode-WebUI/apps/server/src/app.ts`
- [ ] T042 Add success criteria checks (SC-001~SC-004) `specs/001-opencode-webui/quickstart.md`
- [ ] T043 Add automated SC-001/SC-002 validation script placeholder `OpenCode-WebUI/apps/web/scripts/validate-success-criteria.ts`
- [ ] T044 Wire script into root npm scripts `OpenCode-WebUI/package.json`
- [ ] T045 Run quickstart validation checklist in `specs/001-opencode-webui/quickstart.md`

**Notes**: 自动验收脚本先提供占位与接口约定，后续按实现完善指标采集。

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **User Stories (Phase 3-5)** → **Polish (Phase 6)**

### User Story Dependencies

- **US1 (P1)** depends on Foundational
- **US2 (P2)** depends on Foundational
- **US3 (P3)** depends on Foundational and benefits from US2 layout

### Parallel Opportunities

- Phase 2 tasks marked [P] can be done in parallel
- Within each user story, [P] tasks can be parallelized

---

## Parallel Example: User Story 1

```bash
# Parallelizable tasks for US1
Task: T022 Add connect page styles `OpenCode-WebUI/apps/web/src/styles/connect.css`
Task: T024 Add session grouping helper `OpenCode-WebUI/apps/web/src/utils/groupSessions.ts`
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + Phase 2
2. Phase 3 (US1)
3. Validate US1 independently

### Incremental Delivery

1. US1 → validate
2. US2 → validate
3. US3 → validate
4. Polish
