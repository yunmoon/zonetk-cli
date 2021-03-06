import { provide, inject, controller, Http, BaseController, plugin } from "zonetk-core"
import UserService from "../service/user.service";
import { Redis, Cluster } from "ioredis";
@provide("userController")
@controller("/")
export default class UserController extends BaseController {

  @inject("userService") userService: UserService

  @plugin("redis") redis: Redis | Cluster

  @Http.get("/users")
  public getUsers() {
    this.ctx.body = {
      code: 0,
      msg: "测试"
    }
  }

  @Http.get("/user/:id")
  async getUserDetail() {
    const id = this.ctx.params.id;
    await this.redis.set("test", "12314243");
    console.log(await this.redis.get("test"));
    const result = await this.userService.findById(id);
    this.ctx.body = {
      code: 0,
      msg: "测试1",
      data: result
    }
  }
}
