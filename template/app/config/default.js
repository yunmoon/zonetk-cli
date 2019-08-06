const { join } = require("path");
const appDir = process.cwd();
function isTypeScriptEnvironment() {
  return !!require.extensions['.ts'];
}
function getEntityDir() {
  if (isTypeScriptEnvironment()) {
    return join(appDir, 'src/entity/*.ts');
  } else {
    return join(appDir, 'dist/entity/*.js');
  }
}
function getMigrationDir() {
  if (isTypeScriptEnvironment()) {
    return join(appDir, 'src/migration/**/*.ts');
  } else {
    return join(appDir, 'dist/migration/**/*.js');
  }
}
module.exports = {
  db: {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "zonetk_demo",
    logging: true,
    entities: [
      getEntityDir()
    ],
    migrations: [
      getMigrationDir()
    ],
    synchronize: false,
  },
  aa: {
    aa: 111
  }
}