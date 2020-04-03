const path = require("path");
const chalk = require("chalk");
const util = require('util');
let { exec } = require('child_process');
exec = util.promisify(exec);
module.exports = {
  command: "create:admin",
  desc: "create new admin web project",
  builder(args) {
    return args.option("n", {
      alias: "name",
      default: "zonetk-admin-demo",
      describe: "项目名称",
      type: "string",
      demand: true
    });
  },
  async handler(argv) {
    const projectName = argv.name;
    const projectPath = path.join(rootDir, projectName);
    const {stderr } = await exec(`git clone https://github.com/yunmoon/gioneco_base_admin_ts.git ${projectName}`);
    // console.log('stdout:', stdout);
    if(stderr){
      console.error('stderr:', stderr);
    }
    console.log(chalk.green("项目创建成功"));
    console.log(chalk.yellow(projectPath));
    console.log(`cd ${projectName} && npm install`)
  }
}