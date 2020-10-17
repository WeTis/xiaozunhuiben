// pages/qb/ab.js
import { api } from './module.js';
const http = new api();
const app = getApp()
import { isLogin, login, isBuy, orderNumFN} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    msg : {
      complete: 0,
      all: -1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getinfo();
  },
  getinfo() {
    let that = this;
    if (isBuy(true)) {
      orderNumFN((res) => {
        console.log(res);
        that.setData({
          money: 200,
          msg: res
        })
      })
      
    }
    this.getData();
  },
  getData() {
    let data = {
      pageSize: 100,
      pageNumber: 1,
      userId: app.globalData.userInfo.id,
      orderType: 3
    }
    http.getOrderList(data)
      .then(res => {
        let list = res.pageInfo.list;
        list = list.map(item => {
          let l = item.couponId;
          let name = '';
          if(l == 1) {
            name = '3次会员卡';
          } else if (l == 2) {
            name = '12次会员卡'
          } else if (l == 3) {
            name = '24次会员卡'
          } else if (l == 4) {
            name = '季卡'
          } else if (l == 5) {
            name = '年卡'
          } else if (l == 6) {
            name = '押金'
          }
          item.cn = name;
          return item;
        })
        this.setData({
          list: list
        })
      })
  },
  tixian() {
    let that = this;
    let id = (this.data.list)[this.data.list.length - 1].id
    let msg = this.data.msg;
    if (msg.complete != msg.all) {
      wx.showModal({
        title: '提示',
        content: '你好，你还有借书订单未完成，不能退押金',
        success(res) {
          if (res.confirm) {

          } else if (res.cancel) {
            
          }
        }
      })
      return false;
    }
    if(this.data.money == 0) {
      wx.showModal({
        title: '提示',
        content: '你好，您无可提现押金,是否充值押金？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/hy/hy"
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '很遗憾，你无法使用此功能',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      return false;
    } else {
      let data = {
        id: id,
        money: 200*100
      }
      http.checkRefuse(data)
        .then(res => {
          let data = {
            id: app.globalData.userInfo.id,
            userBalance: 0
          }
          http.uodateUser(data)
            .then(res => {
              wx.showToast({
                title: '提现成功',
              })
              setTimeout(() => {
                login(() => {
                 that.setData({
                   money: 0
                 })
                })
              })
            })
        })
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

  }
})