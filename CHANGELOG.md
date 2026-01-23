## [UnReleased]

### 功能
- 搭建 OpenCode WebUI Monorepo 基础结构
  - 创建 monorepo 目录：apps/web、apps/server、packages/shared
  - 配置 pnpm workspace 和根 package.json
  - 添加基础 TypeScript 配置（严格类型安全）
  - 搭建 shared 包：类型定义和 API 客户端封装
  - 搭建 web 应用：React + Vite + TypeScript
  - 搭建 server 服务：Koa 骨架 + 健康检查端点
- 实现 User Story 1（MVP）：连接到服务器并查看会话列表
  - 创建连接页面，支持输入服务器地址
  - 实现连接错误分类（invalid URL/unreachable/server error）
  - 添加会话列表组件，按项目分组显示
  - 实现左侧边栏，展示项目和会话
  - 添加连接状态管理和错误处理
  - 支持断开连接功能

### 优化
- 使用 typescript-project-starter skill 优化项目配置
- 新增 `prettier.config.cjs` 配置文件，统一代码格式化规范
- 更新 `.github/ISSUE_TEMPLATE/config.yml`，添加详细的配置说明和链接
- 更新 `.github/ISSUE_TEMPLATE/bug_report.yml`，使用更详细的标准模板，支持桌面和移动端环境信息收集
- 更新 `.github/ISSUE_TEMPLATE/feature_request.yml`，使用更详细的标准模板，引导用户提供完整的功能请求信息
- 验证 ESLint、Prettier、Jest 测试和构建流程，确保配置正确

### 0.1.0 (2025-11-16)

初始发布：

- 基于 TypeScript + Vite + React 的组件库脚手架
- 集成 ESLint + Prettier 代码规范
- 集成 Jest + @testing-library/react 单元测试
- 提供示例组件 `Button` 与测试
- 使用 yarn 管理依赖
