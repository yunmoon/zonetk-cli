const path = require("path");
const chalk = require("chalk");
const commandUtil = require("./commandUtils");
const _ = require("lodash");
const pluralize = require('pluralize');
const generateService = require("./generateServiceCommand");
const generateController = require("./generateControllerCommand");
module.exports = {
  command: "create:entity",
  desc: "create project entity",
  builder(args) {
    return args.option("n", {
      alias: "name",
      describe: "entity name",
      type: "string",
      demand: true
    }).option("a", {
      alias: "all",
      describe: "是否生成包括service,controller",
      type: "boolean"
    });
  },
  async handler(argv) {
    if (!argv.name) {
      console.log(chalk.yellow("name is required"))
      process.exit()
    }
    const name = _.camelCase(argv.name);
    let fileName = `${name}.ts`;
    fileName = path.join(process.cwd(), "src", "entity", fileName);
    await commandUtil.createFile(fileName, getEntityTemplate(name), false);
    console.log(chalk.yellow(fileName))
    console.log(chalk.green("创建成功"))
    if (argv.all) {
      await generateService.handler(argv);
      await generateController.handler(argv);
    }
  }
}

function getEntityTemplate(name) {
  return `
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "zonetk-core";
@Entity({ name: "${pluralize(name)}" })
export class ${_.upperFirst(name)} {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}`
}