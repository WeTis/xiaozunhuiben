import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  getBookList(data) {
    return this.request('/user/getProductList', data, "POST");
  }

}

export { api };