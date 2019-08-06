const path = require("path");
const chalk = require("chalk");
const commandUtil = require("../lib/commandUtils");
const _ = require("lodash");
module.exports = {
  command: "create:service",
  desc: "create project service",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "service name",
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
    let fileName = `${name}.service.ts`;
    fileName = path.join(process.cwd(), "src", "service", fileName);
    await commandUtil.createFile(fileName, getServiceTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getServiceTemplate(name) {
  return `
import { provide, BaseService } from "zonetk-core"
import { ${_.upperFirst(name)} } from "../entity/${name}";

@provide("${name}Service")
export default class ${_.upperFirst(name)}Service extends BaseService {

  constructor() {
    super(${_.upperFirst(name)});
  }
}`
}