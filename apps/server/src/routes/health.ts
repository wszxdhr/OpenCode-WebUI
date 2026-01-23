import Router from '@koa/router'

export const healthRouter = new Router({
  prefix: '/health'
})

healthRouter.get('/', async (ctx) => {
  ctx.body = {
    status: 'ok',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  }
})
