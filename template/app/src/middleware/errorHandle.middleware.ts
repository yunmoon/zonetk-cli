import { WebMiddleware, provide, BaseMiddleware } from "zonetk-core";
import { RESPONSE_CODE } from "../constant";

@provide()
export class ErrorHandleMiddleware extends BaseMiddleware implements WebMiddleware {
  resolve() {
    return async (ctx, next) => {
      this.ctx = ctx;
      try {
        await next();
      } catch (error) {
        console.log(error)
        const logger = this.getLogger();
        logger.error({ error });
        ctx.body = RESPONSE_CODE.INTERNAL_ERROR
      }
    }
  }

}