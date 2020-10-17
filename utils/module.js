import { HTTP } from './http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
    * 获取订单
    */
  getOrderList(data) {
    return this.request("/user/getOrderList", data, "POST")
  }

  /**
   * 提现
   */
  checkRefuse(data) {
    return this.request('/user/checkRefuse', data, "POST");
  }

  uodateUser(data) {
    return this.request('/user/uodateUser', data, "POST");
  }
}

export { api };