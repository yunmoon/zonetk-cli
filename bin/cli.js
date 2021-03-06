#!/usr/bin/env node

const yargs = require("yargs");
yargs
  .command(require("../lib/createCommand"))
  .command(require("../lib/generateServiceCommand"))
  .command(require("../lib/generateEntityCommand"))
  .command(require("../lib/generateControllerCommand"))
  .command(require("../lib/generateMiddlewareCommand"))
  .command(require("../lib/generatePluginCommand"))
  .command(require("../lib/generateTransformerCommand"))
  .command(require("../lib/generateRpcServiceCommand"))
  .command(require("../lib/generateScheduleCommand"))
  .command(require("../lib/createAdminCommand"))
  .demandCommand(1, 'You need at least one command before moving on')
  .alias("v", "version")
  .help("h")
  .alias("h", "help")
  .argv;