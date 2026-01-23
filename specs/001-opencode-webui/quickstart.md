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

### Success Criteria Checks

- **SC-001**: 用户能够通过连接页面输入有效服务器地址并成功连接到 OpenCode Server
  - 验证: 输入有效 URL 后，连接成功进入主界面
  - 状态: 会话列表按项目分组正确显示

- **SC-002**: 首次连接后会话列表在 2 秒内呈现
  - 验证: 连接后会话列表加载时间 < 2000ms
  - 状态: 会话数据完整渲染

- **SC-003**: 用户能够选择会话并查看消息内容
  - 验证: 选择会话后消息列表正确显示
  - 状态: 消息按时间顺序排列

- **SC-004**: 用户能够发送消息并看到新消息出现
  - 验证: 发送消息后新消息立即显示在列表中
  - 状态: WebSocket/SSE 实时更新正常工作

### Verification Steps

1. Open the app and connect to server
   - ✅ 输入服务器地址 (http://localhost:4096)
   - ✅ 点击连接按钮
   - ✅ 验证连接成功并进入主界面

2. Confirm sessions list loads
   - ✅ 验证左侧边栏显示会话列表
   - ✅ 验证会话按项目分组

3. Confirm session selection and message display
   - ✅ 选择一个会话
   - ✅ 验证中间区域显示消息列表
   - ✅ 验证消息内容正确显示

4. Verify message sending works
   - ✅ 在消息输入框输入内容
   - ✅ 点击发送按钮
   - ✅ 验证新消息出现在列表中

### Quickstart Validation Checklist

- [ ] pnpm install completed successfully
- [ ] pnpm dev (web) starts without errors
- [ ] pnpm dev:server starts without errors
- [ ] Health endpoint returns 200 OK
- [ ] Frontend can connect to health endpoint
- [ ] Frontend can connect to OpenCode Server
- [ ] Sessions list loads and displays correctly
- [ ] Message list loads on session selection
- [ ] Message sending works correctly
