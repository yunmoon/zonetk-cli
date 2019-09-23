const path = require("path");
const chalk = require("chalk");
const commandUtil = require("./commandUtils");
const _ = require("lodash");
module.exports = {
  command: "create:schedule",
  desc: "create schedule",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "schedule name",
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
    let fileName = `${name}.schedule.ts`;
    fileName = path.join(process.cwd(), "src", "schedule", fileName);
    await commandUtil.createFile(fileName, getScheduleTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getScheduleTemplate(name) {
  return `
import { ScheduleInterface, provide, schedule } from "zonetk-core";
@provide("${name}Schedule")
@schedule()
export default class ${_.upperFirst(name)}Schedule implements ScheduleInterface{
  enable: boolean = true;
  pm2OneInstance: boolean = true;
  time = {
    second: [5]
  }
  async resolve(): Promise<any> {
    // do something
    console.log("${name} schedule")
  }
}`
}