## [UnReleased]

### 功能
- 实现 User Story 2（三栏布局与侧边栏折叠）
  - 创建主布局容器 MainLayout
  - 添加可折叠的左右侧边栏
  - 实现左侧导航标签（项目/会话/设置）
  - 添加右侧边栏占位符（代码视图）
  - 添加完整的布局样式
- 实现 User Story 3（查看会话内容并输入消息）
  - 添加消息列表组件，支持按发送者分组（用户/助手/系统）
  - 添加消息输入组件，支持发送消息
  - 实现消息获取功能（选择会话时加载）
  - 实现发送消息 API 封装
  - 添加共享空状态/加载 UI 组件
- 完善 quickstart.md
  - 添加成功标准检查（SC-001~SC-004）
  - 添加验证步骤和清单
- 添加自动化验证脚本占位符
  - 连接验证脚本到 npm scripts
- 在 server app.ts 中记录未认证服务器骨架
- TypeScript 严格类型安全配置（已有）
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
- 从 pnpm 迁移到 yarn 包管理器，简化依赖管理
- 移除共享包依赖，使用本地类型定义替代
- 删除旧的 src 目录和 packages/shared 目录
- 优化布局组件中的特殊字符显示

### 0.1.0 (2025-11-16)

初始发布：

- 基于 TypeScript + Vite + React 的组件库脚手架
- 集成 ESLint + Prettier 代码规范
- 集成 Jest + @testing-library/react 单元测试
- 提供示例组件 `Button` 与测试
- 使用 yarn 管理依赖
