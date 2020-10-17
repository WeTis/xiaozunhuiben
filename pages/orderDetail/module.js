import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }


  getProductByOrderId(data) {
    return this.request("/user/getProductByOrderId", data, "POST")
  }

  getOrderKdList(data) {
    return this.request("/user/getOrderKdList", data, "POST")
  }

  
}

export { api };