// pages/my/my.js
import { isLogin } from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconsData: [
      {
        icons: 'icon-quanbudingdan',
        name: '全部订单',
        id: 1
      },
      {
        icons: 'icon-daifukuan',
        name: '待付款',
        id: 2
      },
      {
        icons: 'icon-daifahuo',
        name: '待发货',
        id: 3
      },
      {
        icons: 'icon-daishouhuo',
        name: '待收货',
        id: 4
      },
      {
        icons: 'icon-daiguihuan',
        name: '待归还',
        id: 5
      },
      {
        icons: 'icon-daijiesuan',
        name: '待结算',
        id: 6
      },
      {
        icons: 'icon-daipingjia',
        name: '待评价',
        id: 7
      },
      {
        icons: 'icon-tuikuan',
        name: '退款',
        id: 8
      }
    ],
    showDialog: false,
    userLabel: null,
    cardCount: null
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
    let info = wx.getStorageSync("userInfo") || null;
    if (info) {
      this.setData({
        userLabel: info.userLabel,
        cardCount: info.cardCount
      })
    }
    
  },
  jumpToAddress() {
    if (!isLogin()) {
      return false;
    }

    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  clickBuy(){
    wx.navigateTo({
      url: '/pages/zshy/zshy',
    })
  },
  jumpUs(){
    wx.showToast({
      title: '功能正在开发中，敬请期待',
      icon: 'none'
    })
  },
  jumpToHy() {
    wx.navigateTo({
      url: '/pages/hy/hy'
    })
  },
  jumpToHelp() {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  jumpToQb() {
    if (!isLogin()) {
      return false;
    }

    wx.navigateTo({
      url: '/pages/qb/qb',
    })
  },
  jumpTowishlist() {
    if (!isLogin()) {
      return false;
    }

    wx.navigateTo({
      url: '/pages/wishlist/wishlist',
    })
  },
  jumpTouserInfo() {
    if (!isLogin()) {
      return false;
    }

    wx.navigateTo({
      url: '/pages/userInfo/userInfo',
    })
  },
  jumpToOrderList(e) {
    if (!isLogin()) {
      return false;
    }

    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/orderList/orderList?id='+id,
    })
  },
  handleContact(e){

  },
  open() {
    this.setData({
      showDialog: true
    })
  },
  hideDialog() {
    this.setData({
      showDialog: false
    })
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