import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  getOneProduct(data) {
    return this.request('/targetWar/user/getOneProduct', data, "POST");
  }

}

export { api };