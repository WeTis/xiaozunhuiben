import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }


  getOrderList(data) {
    return this.request("/user/getOrderList", data, "POST")
  }

  changeOrderStatus(data) {
    return this.request('/user/updateWxOrder', data, 'POST')
  }
  insertOrderKd(data) {
    return this.request('/user/insertOrderKd', data, 'POST')
  }
  getOrderKdList(data) {
    return this.request("/user/getOrderKdList", data, "POST")
  }
  ratedOrder(data) {
    return this.request("/wxuser/ratedOrder", data, "POST")
  }
}

export { api };