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
  logger: {
    level: "info",
    // filename: 'output-%DATE%.log',
    // dirname: `${appDir}/logs`,
    // datePattern: 'YYYY-MM-DD-HH',
    // zippedArchive: true,
    // maxSize: '20m',
    // maxFiles: '15d',
  },
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
  redis: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: 1
  }
}