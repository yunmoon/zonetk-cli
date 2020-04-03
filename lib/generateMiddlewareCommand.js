const path = require("path");
const chalk = require("chalk");
const commandUtil = require("./commandUtils");
const _ = require("lodash");
module.exports = {
  command: "create:middleware",
  desc: "create project middleware",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "middleware name",
      type: "string",
      demand: true
    });
  },
  async handler(argv) {
    if (!argv.name) {
      console.log(chalk.yellow("name is required"))
      process.exit()
    }
    const name = _.camelCase(argv.name);
    let fileName = `${name}.middleware.ts`;
    fileName = path.join(process.cwd(), "src", "middleware", fileName);
    await commandUtil.createFile(fileName, getMiddlewareTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getMiddlewareTemplate(name) {
  return `
import { WebMiddleware, provide, BaseMiddleware } from "zonetk-core";
@provide("${name}Middleware")
export class ${_.upperFirst(name)}Middleware extends BaseMiddleware implements WebMiddleware {
  resolve() {
    return async (ctx, next) => {
      // do something
    }
  }
}`
}