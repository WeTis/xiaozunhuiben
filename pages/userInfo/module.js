import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  uodateUser(data) {
    return this.request('/user/uodateUser', data, "POST");
  }

}

export { api };