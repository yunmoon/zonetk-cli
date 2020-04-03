const SUCCESS = {
  code: 0,
  msg: "SUCCESS"
}
const INTERNAL_ERROR = {
  code: 1001,
  msg: "系统繁忙，请稍后重试。"
}
const PARAM_ERROR = {
  code: 1002,
  msg: "参数错误"
}

export const RESPONSE_CODE = {
  SUCCESS,
  PARAM_ERROR,
  INTERNAL_ERROR
}