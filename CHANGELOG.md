## [UnReleased]

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
