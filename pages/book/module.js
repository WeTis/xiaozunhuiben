import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  getOneProduct(data) {
    return this.request('/user/getOneProduct', data, "POST");
  }
  
  addcard(data){
    return this.request("/wxuser/addCar",data,"POST")
  }

  insertAdvice(data) {
    return this.request("/wxuser/insertAdvice", data, "POST")
  }

  getcard(data) {
    return this.request("/wxuser/getCar", data, "POST")
  }
}

export { api };