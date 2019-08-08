import { ZonetkApplication, WebMiddleware, createConnection } from "zonetk-core";
import * as json from "koa-json";
import * as bodyparser from "koa-bodyparser";
import * as config from "config";
import { DatabaseLog } from "./lib/databaseLog.lib";
const dbConfig = config.get("db");
const app = new ZonetkApplication();
//建立数据库连接
createConnection({
    ...dbConfig,
    logger: new DatabaseLog(app)
}).then(async () => {
    const port = process.env.PORT || "1337";
    const errorHandleMiddleware: WebMiddleware = await app.applicationContext.getAsync("errorHandleMiddleware");
    app.use(errorHandleMiddleware.resolve());
    app.use(bodyparser({
        enableTypes: ["json", "form", "text"],
        extendTypes: {
            text: ["text/xml", "application/xml"]
        }
    }));
    app.use(json());
    const requestLogMiddleware: WebMiddleware = await app.applicationContext.getAsync("requestLogMiddleware");
    app.use(requestLogMiddleware.resolve());
    await app.ready();
    app.listen(port, () => {
        console.log(`app is runing: http://localhost:${port}`)
    })
}).catch(error => console.log('TypeORM connection error: ', error));