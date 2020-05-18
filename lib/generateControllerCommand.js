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
    }).option("e", {
      alias: "empty",
      describe: "是否生成一个空的controller",
      type: "boolean"
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
    let tmpl = getEmptyControllerTemplate(name)
    if (!argv.empty) {
      tmpl = getControllerTemplate(name)
    }
    await commandUtil.createFile(fileName, tmpl, false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getControllerTemplate(name) {
  return `
import { provide, inject, controller, Http, BaseController } from "zonetk-core"
import ${_.upperFirst(name)}Service from "../service/${name}.service";
import { RESPONSE_CODE } from "../constant";
@provide("${name}Controller")
@controller("/")
export default class ${_.upperFirst(name)}Controller extends BaseController {

  @inject("${name}Service") ${name}Service: ${_.upperFirst(name)}Service
  @Http.get("/${pluralize(name)}")
  public async get${pluralize(_.upperFirst(name))}() {
    const result = await this.${name}Service.findAll();
    return this.ctx.body = {
      ...RESPONSE_CODE.SUCCESS,
      data: result
    }
  }
}`
}

function getEmptyControllerTemplate(name) {
  return `
import { provide, controller, BaseController } from "zonetk-core"
@provide("${name}Controller")
@controller("/")
export default class ${_.upperFirst(name)}Controller extends BaseController {

}`
}