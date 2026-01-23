/**
 * OpenCode WebUI Server - Unauthenticated Skeleton
 *
 * 本阶段为未认证的 Koa 服务骨架，仅提供健康检查端点。
 * 前端直接连接到 OpenCode Server 进行实际的会话/消息操作。
 *
 * 后续扩展计划：
 * - 如需添加认证，请在路由层实现
 * - 如需添加 shell 执行功能，请配置 allowlist + timeout + output 处理
 */

import Koa from 'koa'
import Router from '@koa/router'
import { healthRouter } from './routes/health.js'

const app = new Koa()
const router = new Router()

app.use(router.routes())
app.use(router.allowedMethods())

app.use(healthRouter.routes())
app.use(healthRouter.allowedMethods())

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export { app }
