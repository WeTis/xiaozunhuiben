import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取书籍列表
   */
  wxPay(data) {
    return this.request('/wxuser/wxPay', data, "POST");
  }

  changeOrderStatus(data) {
    return this.request('/user/updateWxOrder', data, 'POST')
  }

  uodateUser(data) {
    return this.request('/user/uodateUser', data, "POST");
  } 

  useMemberCard(data) {
    return this.request('/wxuser/useMemberCard', data, "POST");
  }
}

export { api };