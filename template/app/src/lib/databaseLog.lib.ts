import { Logger, logger, ZonetkApplication, MidwayRequestContainer } from "zonetk-core";
export class DatabaseLog implements Logger {
  @logger()
  logger

  ctx

  constructor(private app: ZonetkApplication) {
  }

  logQuery(query: string, parameters?: any[], queryRunner?: import("zonetk-core").QueryRunner) {
    const requestContext: MidwayRequestContainer = this.app.applicationContext.get("requestContext");
    this.ctx = requestContext.ctx
    const log = this.getLogger();
    log.info({ query, parameters });
  }
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import("zonetk-core").QueryRunner) {
    throw new Error("Method not implemented.");
  }
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import("zonetk-core").QueryRunner) {
    throw new Error("Method not implemented.");
  }
  logSchemaBuild(message: string, queryRunner?: import("zonetk-core").QueryRunner) {
    throw new Error("Method not implemented.");
  }
  logMigration(message: string, queryRunner?: import("zonetk-core").QueryRunner) {
    throw new Error("Method not implemented.");
  }
  log(level: "log" | "info" | "warn", message: any, queryRunner?: import("zonetk-core").QueryRunner) {
    throw new Error("Method not implemented.");
  }
  getLogger() {
    const requestId = (this.ctx && this.ctx.get("request-id")) || ""
    return this.logger.child({ requestId });
  }

}