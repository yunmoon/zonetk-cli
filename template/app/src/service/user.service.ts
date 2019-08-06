import { provide, BaseService } from "zonetk-core"
import { User } from "../entity/user";

@provide("userService")
export default class UserService extends BaseService<User> {

  constructor() {
    super(User);
  }
}