const path = require("path");
const chalk = require("chalk");
const commandUtil = require("../lib/commandUtils");
const _ = require("lodash");
module.exports = {
  command: "create:plugin",
  desc: "create project plugin",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "plugin name",
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
    let fileName = `${name}.plugin.ts`;
    fileName = path.join(process.cwd(), "src", "plugin", fileName);
    await commandUtil.createFile(fileName, getPluginTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getPluginTemplate(name) {
  return `
import { BasePlugin, ZonetkPlugin } from "zonetk-core";
export default class RedisPlugin extends BasePlugin implements ZonetkPlugin <any>{

  constructor() {
    super()
  }
  resolve() {
    //do something
    //return {};
  }
}`
}