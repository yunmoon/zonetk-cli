const path = require("path");
const chalk = require("chalk");
const commandUtil = require("../lib/commandUtils");
const _ = require("lodash");
module.exports = {
  command: "create:rpc",
  desc: "create project rpc service",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "rpc service name",
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
    let fileName = `${name}.rpc.ts`;
    fileName = path.join(process.cwd(), "src", "rpc", fileName);
    await commandUtil.createFile(fileName, getRpcServiceTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
  }
}

function getRpcServiceTemplate(name) {
  return `
import { provide, rpcService, BaseRpcService } from "zonetk-core"
@provide("${name}RpcService")
@rpcService()
export default class ${_.upperFirst(name)}RpcService extends BaseRpcService {
  // function must return Promise
  async testFunction(call, callback) {
    // do something
  }
}`
}