# Phase 0 Research: OpenCode WebUI Monorepo

## Decisions

### OpenCode Server API 通信方式

- Decision: 使用 HTTP REST + SSE (`/event`) 获取会话与消息更新，PTY 终端使用 WebSocket (`/pty/:id/connect`)；本阶段 UI 仅使用 HTTP + SSE。
- Rationale: 官方文档与 opencode-web 实现均采用 REST + SSE 进行会话/消息更新，符合“HTTP(S)+WebSocket 并存”要求；PTY WebSocket 可留作后续功能。
- Alternatives considered: 仅 HTTP 轮询；仅 WebSocket 双向流。被拒绝原因：轮询延迟高；WebSocket 协议不易与现有 OpenCode 文档对齐。

### 会话与消息端点对齐

- Decision: 读取会话使用 `GET /session`，消息列表使用 `GET /session/:id/message`，发送消息使用 `POST /session/:id/message`；事件流使用 `GET /event`。
- Rationale: 官方 Server 文档和 opencode-web 均采用该路径；SDK 与 types.gen.ts 类型定义支持该模型。
- Alternatives considered: 自建 `/api/sessions` 代理层。被拒绝原因：当前阶段 Node 服务仅骨架，前端直连 OpenCode Server。

### WebUI 参考实现

- Decision: 参考 `chris-tse/opencode-web` 的 SSE 事件流处理与会话/消息 API 封装模式。
- Rationale: 该项目直接对接 OpenCode Server，包含 EventSource 重连逻辑与消息增量更新处理，适配本需求。
- Alternatives considered: 自研 EventSource 机制，无参考实现。被拒绝原因：增加不确定性与实现成本。

### Monorepo 工具选择

- Decision: 使用 `pnpm` workspaces + 可选 Turborepo（如需要任务编排）。
- Rationale: pnpm 官方推荐 apps/packages 结构；Turborepo 官方推荐 apps/packages 并提供任务图/缓存；符合仓库已有多 Vite/TS 项目的结构习惯。
- Alternatives considered: Yarn workspaces 或 Nx。被拒绝原因：Yarn 在本仓库没有统一使用；Nx 对当前规模偏重。

## Sources

- OpenCode Server 文档: https://opencode.ai/docs/server
- OpenCode SDK 文档: https://opencode.ai/docs/sdk
- OpenCode OpenAPI: https://github.com/anomalyco/opencode/blob/dev/packages/sdk/openapi.json
- OpenCode types 定义: https://github.com/anomalyco/opencode/blob/dev/packages/sdk/js/src/gen/types.gen.ts
- OpenCode WebUI 示例: https://github.com/chris-tse/opencode-web
- pnpm Workspaces: https://pnpm.io/workspaces
- Turborepo 结构建议: https://turbo.build/repo/docs/crafting-your-repository/structuring-a-repository
