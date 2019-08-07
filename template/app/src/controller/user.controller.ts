import { Context } from "koa"
import { provide, inject, controller, get, BaseController } from "zonetk-core"
import UserService from "../service/user.service";
@provide("userController")
@controller("/")
export default class UserController extends BaseController {

  @inject("userService") userService: UserService
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
    const result = await this.userService.findById(id);
    ctx.body = {
      code: 0,
      msg: "测试1",
      data: result
    }
  }
}
