const path = require("path");
const chalk = require("chalk");
const commandUtil = require("./commandUtils");
const _ = require("lodash");
const pluralize = require('pluralize');
module.exports = {
  command: "create:controller",
  desc: "create project controller",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "controller name",
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
    let fileName = `${name}.controller.ts`;
    fileName = path.join(process.cwd(), "src", "controller", fileName);
    await commandUtil.createFile(fileName, getControllerTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getControllerTemplate(name) {
  return `
import { Context } from "koa"
import { provide, inject, controller, get, BaseController } from "zonetk-core"
import ${_.upperFirst(name)}Service from "../service/${name}.service";
@provide("${name}Controller")
@controller("/")
export default class ${_.upperFirst(name)}Controller extends BaseController {

  @inject("${name}Service") ${name}Service: ${_.upperFirst(name)}Service
  @get("/${pluralize(name)}")
  public async get${pluralize(_.upperFirst(name))}(ctx: Context) {
    const result = await this.${name}Service.findAll();
    ctx.body = {
      code: 0,
      msg: "SUCCESS",
      data: result
    }
  }
}`
}