const path = require("path");
const chalk = require("chalk");
const commandUtil = require("../lib/commandUtils");
const _ = require("lodash");
module.exports = {
  command: "create:transformer",
  desc: "create project transformer",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "transformer name",
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
    let fileName = `${name}.transformer.ts`;
    fileName = path.join(process.cwd(), "src", "transformer", fileName);
    await commandUtil.createFile(fileName, getServiceTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getServiceTemplate(name) {
  return `
import { Transformer, provide } from "zonetk-core";

@provide("${name}Transformer")
export default class ${_.upperFirst(name)}Transformer extends Transformer {
  async collection(items) {
    //do something
  }
  async item(item) {
    //do something
  }
}`
}