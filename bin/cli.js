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
  .demandCommand(1, 'You need at least one command before moving on')
  .alias("v", "version")
  .help("h")
  .alias("h", "help")
  .argv;