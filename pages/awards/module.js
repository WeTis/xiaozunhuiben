import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  productLabelList(data) {
    return this.request('/user/productLabelList', data, "POST");
  }

}

export { api };