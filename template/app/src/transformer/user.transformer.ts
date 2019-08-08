import { Transformer, provide } from "zonetk-core";
import { User } from "../entity/user";

@provide()
export default class UserTransformer extends Transformer {
  async collection(item) {
    console.log("---collection---")
    return item[0]
  }
  async item(item: User) {
    console.log("---item---")
    return item
  }
}