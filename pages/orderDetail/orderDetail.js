// pages/submitOrder/submitOrder.js
import { api } from './module.js';
import { formatTime } from '../../utils/util.js';
const http = new api();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate: '',
    enddate: '',
    adress: null,
    list: [],
    kdName: null,
    kdNumber: null,
    orderNumber: null,
    ifBook: null,  // 1 书 2 商品
    userKdName: null,
    userKdNumber: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let orderid = options.orderid;
    let orderNumber = options.ordernumber;
    let startdate = options.startdate;
    let enddate = options.enddate;
    let ifBook = options.ifBook;
    this.setData({
      enddate: enddate,
      startdate: startdate,
      orderNumber: orderNumber,
      ifBook: ifBook
    })
    this.getData(orderid);
    console.log(orderNumber);
    if (orderNumber) {
      this.getOrderKdList(orderNumber)
    }
    
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
  getData(orderid){
    let data = {
      orderId: orderid
    }
    http.getProductByOrderId(data)
    .then(res => {
      console.log(res);
      this.setData({
        adress: res.adress,
        list: res.list
      })
    })
  },
  getOrderKdList(orderNumber){
    let data = {
      orderNumber: orderNumber
    }
    http.getOrderKdList(data)
      .then(res => {
        console.log(res);
        let list = res.list
        if(list.length > 0) {
          let len = list.length - 1;
          let kdNumber = list[len].kdNumber
          let kdNumbers = list[0].kdNumber
          this.setData({
            kdName: (kdNumber.split('$$'))[1],
            kdNumber: (kdNumber.split('$$'))[0],
            userKdName: len > 0 ? (kdNumbers.split('$$'))[1] : null,
            userKdNumber: len > 0 ? (kdNumbers.split('$$'))[0] : null,
          })
        }
        
      })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  jumpToAddress() {
    wx.navigateTo({
      url: '/pages/address/address?id=-1',
    })
  },
  jumpTobookOrder() {
    let info = this.data.list;
    info = info.map(item => {
      let id = item.productId;
      let cardId = item.id;
      item.id = id;
      item.ifBook = this.data.ifBook;
      item.cardId = cardId;
      return item;
    })
    wx.navigateTo({
      url: '/pages/bookOrder/bookOrder?info='+ JSON.stringify(info),
    })
  },
  copy(e){
    let { num  } = e.currentTarget.dataset;
    wx.setClipboardData({
      data: num,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
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