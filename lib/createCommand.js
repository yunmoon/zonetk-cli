const path = require("path");
const chalk = require("chalk");
const commandUtil = require("../lib/commandUtils");
module.exports = {
  command: "create",
  desc: "create new project",
  builder(args) {
    return args.option("n", {
      alias: "name",
      default: "zonetk-demo",
      describe: "项目名称",
      type: "string",
      demand: true
    });
  },
  async handler(argv) {
    const projectName = argv.name;
    const rootDir = process.cwd();
    const projectPath = path.join(rootDir, projectName);
    commandUtil.copyDirectory(`${__dirname}/../template/app`, projectPath);
    console.log(chalk.green("项目创建成功"));
    console.log(chalk.yellow(projectPath));
    console.log(`cd ${projectName} && npm install`)
  }
}