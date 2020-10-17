// pages/zshy/zshy.js
import { api } from './module.js';
const http = new api();
const app = getApp()
import { isLogin, login, isBuy, orderNumFN } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hy: [
      {
        id: 4,
        name: "不限次季卡",
        price: 0.01,
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
        price: 0.01,
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
        price: 0.01,
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
    tabActive: 1,
    tab: [
      {
        name: "礼品",
        id: 1,
        orderStatus: null
      },
      {
        name: "已购买",
        id: 2,
        orderStatus: 0,
      },
      {
        name: "已赠送",
        id: 3,
        orderStatus: 0,
      }
    ],
    list:[],
    huyed:[],
    com:[],
    selectIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list: this.data.hy,
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  clickTab(e) { //更换资讯大类

    let { index, id } = e.currentTarget.dataset;
    this.changeTab(index, id);

  },
  changeTab(index, id) {
    let screenWidth = wx.getSystemInfoSync().windowWidth;

    let itemWidth = screenWidth / 5;


    const { tab } = this.data;

    let scrollX = itemWidth * index - itemWidth * 2;

    let maxScrollX = (tab.length + 1) * itemWidth;

    if (scrollX < 0) {
      scrollX = 0;
    } else if (scrollX >= maxScrollX) {
      scrollX = maxScrollX;
    }
   
   if(id == 2) {
     
     this.getData(() => {
       this.setData({
         x: scrollX,
         tabActive: id,
         orderStatus: tab[index].orderStatus,
         selectIndex: -1
       })
       if (id == 1) {
         this.setData({
           list: this.data.hy
         })
       } else if (id == 2) {
         this.setData({
           list: this.data.huyed
         })
       } else if (id == 3) {
         this.setData({
           list: this.data.com
         })
       }
     })
   } else {
     this.setData({
       x: scrollX,
       tabActive: id,
       orderStatus: tab[index].orderStatus,
       selectIndex: -1
     })
     if (id == 1) {
       this.setData({
         list: this.data.hy
       })
     } else if (id == 2) {
       this.setData({
         list: this.data.huyed
       })
     } else if (id == 3) {
       this.setData({
         list: this.data.com
       })
     }
   }
    
    // this.getOrderList();
  },
  getData(fn) {
    let data = {}
    http.getListMemberCard(data)
    .then(res => {
      console.log(res);
      let list = res.list;
      let hy = this.data.hy;
      let huyed = [];
      let com = [];
      list.map(item => {
        
        let m = {}
        hy.map(items => {
          if(items.id == item.levelType) {
             m = items;
          }
        })
        m.memberCode = item.memberCode;
        m.createDate = item.createDate;

        if(item.ifUse == 1) {
          huyed.push(m)
        } else if(item.ifUse == 2){
          com.push(m) 
        }
      })
      this.setData({
        huyed: huyed,
        com: com
      })
      fn && fn()
    })
  },
  submit() {
    if (!isLogin()) {
      return false;
    }
    if (this.data.selectIndex == -1) {
        wx.showToast({
          title: '请选择卡片',
          icon: 'none'
        })
        return false;
    }
    let s = this.data.list[this.data.selectIndex]
    let money = s.price *100;
    let data = {
      money: money,
      type: 4,
      addressId: 0,
      level: s.id
    }
 
    // let msg = '确定购买' + this.data.hyInfo.name + '？'
    let msg = '确定购买' 
   
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
                    title: '正在生成礼品卡，请稍后',
                    icon: 'none',
                    duration: 12000,
                    mask: true
                  })
                  
                    let data = {
                      id: orderId,
                      status: 2
                    }
                    http.changeOrderStatus(data)
                      .then(res => {
                        setTimeout(() => {
                          wx.showToast({
                            title: '购买成功',
                            icon: 'success',
                            duration: 1000
                          })
                        }, 10000)
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
  },
  clickBuy(e) {
    let index = e.currentTarget.dataset.id;
    let item = (this.data.list)[index];
    this.setData({
      selectIndex: index
    })
  },
  // 赠送
  ss() {
    if (this.data.selectIndex == -1) {
      wx.showToast({
        title: '请选择卡片',
        icon: 'none'
      })
      return false;
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let info = this.data.list[this.data.selectIndex]
    console.log(info.id)
    return {
      title: '你的好友赠送你一张‘' + info.name+'’快来领取使用吧',
      path: '/pages/hy/hy?scene=' + info.memberCode + '&levelType=' + info.id,
      imageUrl: '/images/shareApp.png'
    }
  }
})