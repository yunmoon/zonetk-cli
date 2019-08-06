const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const createDirectories = (directory) => {
  return new Promise((ok, fail) => mkdirp(directory, (err) => err ? fail(err) : ok()));
}
const copyDirectory = (src, dest) => {
  if (fs.existsSync(dest) == false) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return false;
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  var dirs = fs.readdirSync(src);
  dirs.forEach(function (item) {
    var item_path = path.join(src, item);
    var temp = fs.statSync(item_path);
    if (temp.isFile()) { // 是文件
      // console.log("Item Is File:" + item);
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()) { // 是目录
      // console.log("Item Is Directory:" + item);
      copyDirectory(item_path, path.join(dest, item));
    }
  });
}
module.exports = {
  createDirectories,
  copyDirectory,
  /**
   * Creates a file with the given content in the given path.
   */
  async createFile(filePath, content, override = true) {
    await createDirectories(path.dirname(filePath));
    return new Promise((ok, fail) => {
      if (override === false && fs.existsSync(filePath))
        return ok();
      fs.writeFile(filePath, content, err => err ? fail(err) : ok());
    });
  },

  /**
   * Reads everything from a given file and returns its content as a string.
   */
  async readFile(filePath) {
    return new Promise((ok, fail) => {
      fs.readFile(filePath, (err, data) => err ? fail(err) : ok(data.toString()));
    });
  },
  async fileExists(filePath) {
    return fs.existsSync(filePath);
  },
  firstUpperCase(str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
  }
}