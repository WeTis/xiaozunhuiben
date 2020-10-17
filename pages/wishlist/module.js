import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  addWishBook(data) {
    return this.request('/wxuser/addWishBook', data, "POST");
  }

}

export { api };