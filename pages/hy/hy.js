// pages/hy/hy.js
import { api } from './module.js';
const http = new api();
import { isLogin, login, isBuy} from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType: 1,
    userLabel: '',
    iconsData: [
      {
        icons: 'icon-2',
        name: '正品保障',
        id: 1
      },
      {
        icons: 'icon-4',
        name: '往返包邮',
        id: 2
      },
      {
        icons: 'icon-shangpin',
        name: '百万商品',
        id: 3
      },
      {
        icons: 'icon-anquanzhuye',
        name: '安全消毒',
        id: 4
      },
      {
        icons: 'icon-shu',
        name: '每次最多5本',
        id: 5
      },
      {
        icons: 'icon-jihuo',
        name: '激活生效',
        id: 6
      },
      {
        icons: 'icon-dianzan',
        name: '不限次数',
        id: 7
      },
      {
        icons: 'icon-money',
        name: '押金可退',
        id: 8
      }
    ],
    hyInfo: {
      id: 4,
      name: "不限次季卡",
      price: 0.01,
      oldPrice: 499,
      type: 1,
      time: 3
    },
    info: {},
    list: [
      {
        id: 4,
        name: "不限次季卡",
        price: 0.01,
        oldPrice: 499,
        type: 1,
        time: 3
      },
      {
        id: 5,
        name: "不限次年卡",
        price: 799,
        oldPrice: 1699,
        type: 1,
        time: 12
      },
      {
        id: 1,
        name: "3次会员卡",
        price: 0.01,
        oldPrice: 299,
        type: 2,
        time: 3
      },
      {
        id: 3,
        name: "12次会员卡",
        price: 199,
        oldPrice: 1699,
        type: 2,
        time: 12
      },
      {
        id: 2,
        name: "24次会员卡",
        price: 199,
        oldPrice: 1699,
        type: 2,
        time: 12
      }
    ],
    hInfo: {},
    card: {
      id: 4,
      name: "不限次季卡",
      price: 299,
      oldPrice: 499,
      type: 1,
      time: 3,
      bg: '/images/hy/huiyuan-6@2x.png',
      tag: '/images/hy/1@2x.png',
      lo: '/images/hy/j@2x.png'
    },
    cardlist: [
      {
        id: 4,
        name: "不限次季卡",
        price: 299,
        oldPrice: 499,
        type: 1,
        time: 3,
        bg: '/images/hy/huiyuan-6@2x.png',
        tag: '/images/hy/1@2x.png',
        lo: '/images/hy/j@2x.png'
      },
      {
        id: 5,
        name: "不限次年卡",
        price: 799,
        oldPrice: 1699,
        type: 1,
        time: 12,
        bg: '/images/hy/huiyuan-7@2x.png',
        tag: '/images/hy/2@2x.png',
        lo: '/images/hy/n@2x.png'
      },
      {
        id: 1,
        name: "3次会员卡",
        price: 199,
        oldPrice: 299,
        type: 2,
        time: 3,
        bg: '/images/hy/huiyuan-8@2x.png',
        tag: '/images/hy/3@2x.png',
        lo: '/images/hy/c@2x.png'
      },
      {
        id: 3,
        name: "12次会员卡",
        price: 199,
        oldPrice: 1699,
        type: 2,
        time: 12,
        bg: '/images/hy/huiyuan-8@2x.png',
        tag: '/images/hy/3@2x.png',
        lo: '/images/hy/c@2x.png'
      },
      {
        id: 2,
        name: "24次会员卡",
        price: 199,
        oldPrice: 1699,
        type: 2,
        time: 12,
        bg: '/images/hy/huiyuan-8@2x.png',
        tag: '/images/hy/3@2x.png',
        lo: '/images/hy/c@2x.png'
      }
    ],
    memberCode: null,
    levelType: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    // 获取会员卡信息

    let memberCode = app.globalData.memberCode;
    let levelType = app.globalData.levelType;
    let card = null;
    let cardlist = this.data.cardlist;
    cardlist.map(item => {
      if(item.id == levelType) {
        card = item;
      }
    })
    this.setData({
      card: card,
      memberCode: memberCode,
      levelType: levelType
    })
    // 获取当前信息    
    this.getm()
    
  },
  nojihuo(){
    app.globalData.memberCode = null;
    app.globalData.levelType = null;
    this.setData({
      memberCode: null,
      levelType: null
    })
  },
  jihuo() {
    this.getm();
    if (!isLogin()) {
      return false;
    }
    /**
     * 判断是否已经是会员
     */
    if (this.data.hInfo.isMember && !this.data.hInfo.isInvalid) {
      wx.showToast({
        title: '您已经是会员，并且会员未过期，不可叠加使用',
        icon: 'none'
      })
      return false;
    }
    let _this =this;
    let data = {
      code: this.data.memberCode
    }
    http.useMemberCard(data)
      .then(res => {
        wx.showToast({
          title: '您已经激活会员',
        })
        this.nojihuo()
        let datam = {
          id: app.globalData.userInfo.id,
          userBalance: 1,
          cardImage: new Date()
        }
        http.uodateUser(datam)
        .then(res => {
          setTimeout(() => {
            login(() => {
              _this.getm()
            })
          })
        })
      })
   
    console.log(app.globalData.memberCode)
  },
  getm(){
    let info = wx.getStorageSync("userInfo") || null;
    let hInfo = isBuy();
    this.setData({
      userLabel: info ? info.userLabel : '',
      info: info,
      hInfo: hInfo
    })
  },
  clickTab(e) {
   let index =  e.currentTarget.dataset.index;
   this.setData({
     tabType: index
   })
  },
  selectType(e) {
    let id = e.currentTarget.dataset.id;
    let info = {};
    let list = this.data.list;
    for(let i = 0; i < list.length; i++) {
      if(id == list[i].id) {
        info = list[i]
        break;
      }
    }
    this.setData({
      hyInfo: info
    })
  },
  submit() {
    if (!isLogin()) {
      return false;
    }
    let money = 0;
    if (this.data.info.userBalance == 1) {
      money = this.data.hyInfo.price * 100
    }else {
      money = this.data.hyInfo.price * 100 + 200*100
    }
    let data = {
      // money: this.data.hyInfo.price * 100,
      money: money,
      type: 3,
      addressId: 0,
      level: this.data.hyInfo.id
    }
    let datam = {
      id: app.globalData.userInfo.id,
      userBalance: 1,
      cardImage: new Date()
    }
    let msg = '确定购买' + this.data.hyInfo.name+'？'
    if (this.data.hInfo.isMember && !this.data.hInfo.isuserBalance && !this.data.hInfo.isInvalid) {
      // 是会员 已经退押金 没有过期  =》 充值押金
      data = {
        money: 200*100,
        type: 3,    // 充值押金
        addressId: 0,
        level: 6
      }
      msg = '确定充值押金？';
      datam = {
        id: app.globalData.userInfo.id,
        userBalance: 1
      }
    }
    let _this = this;
    wx.showModal({
      title: '提示',
      content: msg,
      success(res) {
        if (res.confirm) {
          http.wxPay(data)
            .then(res => {
              let orderId = res.orderId;
              var timeStamp = res.map.timeStamp;
              var data = res.map;
              wx.requestPayment({
                'timeStamp': timeStamp.toString(),
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': 'MD5',
                'paySign': data.paySign,
                success: function (res) {
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                  })
                  let data = {
                    id: orderId,
                    status: 2
                  }
                  http.changeOrderStatus(data)
                    .then(res => {
                      // 查看订单详情
                      wx.showToast({
                        title: '正在获取会员信息，请稍等',
                        icon: 'none',
                        duration: 12000,
                        mask: true
                      })
                      setTimeout(() => {
                        http.uodateUser(datam)
                          .then(res => {
                            setTimeout(() => {
                              login(() => {
                                _this.getm()
                              })
                            })
                          })

                      },10000)
                      
                      
                    })
                },
                fail: function (err) {
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 2000
                  })

                }
              });
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})