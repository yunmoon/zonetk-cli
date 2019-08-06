import { WebMiddleware, provide, BaseMiddleware } from "zonetk-core";

@provide()
export class ErrorHandleMiddleware extends BaseMiddleware implements WebMiddleware {
  resolve() {
    return async (ctx, next) => {
      this.ctx = ctx;
      try {
        await next();
      } catch (error) {
        const logger = this.getLogger();
        logger.error(error);
        ctx.body = {
          code: -1
        }
      }
    }
  }

}