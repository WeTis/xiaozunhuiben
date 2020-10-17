// pages/submitOrder/submitOrder.js
import { api } from './module.js';
const http = new api();
import { isLogin, isBuy } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    allTime: '',
    content: '',
    address: null,
    pojo: [],
    type: null,
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let type = options.type;
     this.setData({
       type: type
     })
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
    this.getAddress();
    this.getPojo();
    let date = this.getDate(new Date());
    let date1 = new Date();
    date1.setDate(date1.getDate() + 30)
    let endDate = this.getDate(date1);
    this.setData({
      date: date,
      allTime: date + ' 至 ' + endDate
    })

    let info = wx.getStorageSync("userInfo") || null;
    this.setData({
      info: info
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  getDate(now) {
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";
    if (month < 10)
      clock += "0";
    clock += month + "-";
    if (day < 10)
      clock += "0";
    clock += day + " ";
    // if (hh < 10)
    //   clock += "0";
    // clock += hh + ":";
    // if (mm < 10) clock += '0';
    // clock += mm;
    return (clock);
  },
  getAddress() {
    let that = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        that.setData({
          address: res.data
        })
      }
    })
  },
  getPojo() {
    let that = this;
    wx.getStorage({
      key: 'pojo',
      success(res) {
        that.setData({
          pojo: res.data
        })
      }
    })
  },
  getcontent(e) {
    let value = e.detail.value;
    this.setData({
      content: value
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
    let info = this.data.pojo;
    info = info.map(item => {
      let id = item.productId;
      item.id = id;
      item.ifBook = this.data.type == 'shop' ? 2 : 1;
      money = money + (item.productPrice * item.productCount)
      return item;
    })
    wx.navigateTo({
      url: '/pages/bookOrder/bookOrder?info=' + JSON.stringify(info),
    })
  },
  submit() {
    if (!this.data.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return false;
    }
    // 判断是否退还押金以及是否是会员
    if (this.data.type != 'shop') {
      if (!isBuy()) {
        return false;
      }
    }
    
    let info = this.data.pojo;
    let money = 0;
    let id = [];
    info = info.map(item => {
      money = money + (item.productPrice * item.productCount)
      id.push(item.productId)
    })
    // 组建pojo

    let data = {
      money: this.data.type == 'shop' ? money*100 : 0,
      type: this.data.type == 'shop' ? 2 : 1,
      addressId: this.data.address.id,
      productId: id.join(),
      content: this.data.content ? this.data.content : '暂无留言',
      pojo: JSON.stringify(this.data.pojo),
    }
    http.wxPay(data)
     .then(res => {
       let orderId = res.orderId;
       if (this.data.type == 'shop') {
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
               duration: 2000
             })
             let data = {
               id: orderId,
               status: 2
             }
             http.changeOrderStatus(data)
               .then(res => {
                 // 查看订单详情
                 setTimeout(() => {
                   // 如果是图文咨询则跳转至chat页面
                   //  if (that.data.type == 1) {
                   //    that.jumpToChat(orderId);
                   //  } else {
                   //    that.jumpToUserOrder();
                   //  }
                   wx.reLaunch({
                     url: "/pages/shop/index/index?clickName=商品"
                   })
                 })
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
       }else{
         // 跳转到我的页面
         
         let data = {
           id: orderId,
           status: 1
         }
         http.changeOrderStatus(data)
           .then(res => {
             // 查看订单详情
             wx.showToast({
               title: '操作成功',
               icon: 'success',
               duration: 2000
             })
             setTimeout(() => {
               
               wx.reLaunch({
                 url: '/pages/my/my'
               });

             })
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