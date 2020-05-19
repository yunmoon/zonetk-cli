import { Logger, logger, ZonetkApplication, MidwayRequestContainer, QueryRunner, config } from "zonetk-core";
export class DatabaseLog implements Logger {
  @logger()
  logger

  @config("requestIdKey")
  requestIdKey: string

  ctx

  rpcRequestCall

  env

  private queryLogEnv = ["development", "cdtest"];

  constructor(private app: ZonetkApplication) {
    this.env = process.env.NODE_ENV || "development";
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
      const rpcRequestContainer: any = this.app.applicationContext.get("rpcRequestContainer");
      this.rpcRequestCall = rpcRequestContainer.get("rpcRequestCall")
    } catch (error) {
      let requestId = "";
      return this.logger.child({ requestId });
    }
    let requestId = "";
    if (this.ctx && this.ctx.get(this.requestIdKey)) {
      requestId = this.ctx.get(this.requestIdKey)
    }
    if (!requestId && this.rpcRequestCall && this.rpcRequestCall.request["headers"]) {
      requestId = this.rpcRequestCall.request["headers"][this.requestIdKey] || ""
    }
    return this.logger.child({ requestId });
  }

}