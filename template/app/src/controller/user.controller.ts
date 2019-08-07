import { Context } from "koa"
import { provide, inject, controller, get, BaseController, plugin } from "zonetk-core"
import UserService from "../service/user.service";
import { Redis, Cluster } from "ioredis";
@provide("userController")
@controller("/")
export default class UserController extends BaseController {

  @inject("userService") userService: UserService

  @plugin("redis") redis: Redis | Cluster

  @get("/users")
  public getUsers(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: "测试"
    }
  }

  @get("/user/:id")
  async getUserDetail(ctx: Context) {
    const id = ctx.params.id;
    await this.redis.set("test", "12314243");
    console.log(await this.redis.get("test"));
    const result = await this.userService.findById(id);
    ctx.body = {
      code: 0,
      msg: "测试1",
      data: result
    }
  }
}
