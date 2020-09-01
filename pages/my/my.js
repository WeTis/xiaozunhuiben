// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconsData: [
      {
        icons: 'icon-instruction',
        name: '全部订单'
      },
      {
        icons: 'icon-instruction',
        name: '待付款'
      },
      {
        icons: 'icon-instruction',
        name: '待发货'
      },
      {
        icons: 'icon-instruction',
        name: '待收货'
      },
      {
        icons: 'icon-instruction',
        name: '待归还'
      },
      {
        icons: 'icon-instruction',
        name: '待结算'
      },
      {
        icons: 'icon-instruction',
        name: '待评价'
      },
      {
        icons: 'icon-instruction',
        name: '退款'
      }
    ],
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

  },
  jumpToAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  jumpTowishlist() {
    wx.navigateTo({
      url: '/pages/wishlist/wishlist',
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