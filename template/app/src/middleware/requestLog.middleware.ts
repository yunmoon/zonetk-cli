
import { WebMiddleware, provide, BaseMiddleware } from "zonetk-core";
@provide()
export class RequestLogMiddleware extends BaseMiddleware implements WebMiddleware {
  resolve() {
    return async (ctx, next) => {
      this.ctx = ctx;
      const log = this.getLogger();
      log.info({
        ip: ctx.ip,
        method: ctx.method,
        url: ctx.url,
        query: ctx.request.query,
        body: ctx.request.body
      })
      const startTime = new Date().getTime();
      await next();
      const endTime = new Date().getTime();
      log.info({
        url: ctx.url,
        status: ctx.status,
        response: ctx.body,
        spent: `${endTime - startTime}ms`
      });
    }
  }
}