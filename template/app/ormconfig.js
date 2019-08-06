const config = require("config");
const dbconfig = config.get("db")
module.exports = {
   ...dbconfig,
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}