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
