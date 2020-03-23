import { Logger, logger, ZonetkApplication, MidwayRequestContainer, QueryRunner } from "zonetk-core";
export class DatabaseLog implements Logger {
  @logger()
  logger

  ctx

  env

  private queryLogEnv = ["development"];

  constructor(private app: ZonetkApplication) {
    this.env = process.env.NODE_ENV;
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (this.queryLogEnv.includes(this.env)) {
      const log = this.getLogger();
      log.info({ query, parameters });
    }
  }
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const log = this.getLogger();
    log.info({ error, query });
  }
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const log = this.getLogger();
    log.warn({ query, parameters, time });
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    const log = this.getLogger();
    log.info(message);
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    const log = this.getLogger();
    log.info(message);
  }
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    const log = this.getLogger();
    log[level](message);
  }
  getLogger() {
    try {
      const requestContext: MidwayRequestContainer = this.app.applicationContext.get("requestContext");
      this.ctx = requestContext.ctx
    } catch (error) {
    }
    const requestId = (this.ctx && this.ctx.get("request-id")) || ""
    return this.logger.child({ requestId });
  }

}