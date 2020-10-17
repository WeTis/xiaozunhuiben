import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }

  /**
   * 购买会员卡 type 4
   */
  wxPay(data) {
    return this.request('/wxuser/wxPay', data, "POST");
  }
  changeOrderStatus(data) {
    return this.request('/user/updateWxOrder', data, 'POST')
  }
  /**获取会员卡列表 */
  getListMemberCard(data) {
    return this.request('/wxuser/getListMemberCard', data, 'POST')
  }

  uodateUser(data) {
    return this.request('/user/uodateUser', data, "POST");
  }
}

export { api };