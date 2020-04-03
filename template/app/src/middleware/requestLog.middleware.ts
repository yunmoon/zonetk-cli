
import { WebMiddleware, provide, BaseMiddleware } from "zonetk-core";
@provide()
export class RequestLogMiddleware extends BaseMiddleware implements WebMiddleware {
  resolve() {
    return async (ctx, next) => {
      this.ctx = ctx;
      const log = this.getLogger();
      let bodyLength = JSON.stringify(ctx.request.body).length
      log.info({
        ip: ctx.ip,
        method: ctx.method,
        url: ctx.url,
        query: ctx.request.query,
        body: bodyLength > 500 ? "body too large.." : ctx.request.body
      })
      const startTime = new Date().getTime();
      await next();
      if (ctx.status === 200) {
        const endTime = new Date().getTime();
        bodyLength = JSON.stringify(ctx.body).length
        log.info({
          url: ctx.url,
          status: ctx.status,
          response: bodyLength > 500 ? "body too large.." : ctx.body,
          spent: `${endTime - startTime}ms`
        });
      }
      
    }
  }
}