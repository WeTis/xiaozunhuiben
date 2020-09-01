// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [
      {
        name: '魏桐',
        phone: '15102972846',
        address: '北京市东城区测试地点',
        id: 1
      },
      {
        name: '魏桐222',
        phone: '15102972846',
        address: '北京市东城区测试地点',
        id: 2
      }
    ],
    checkStatus: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   if(options.id) {
     this.setData({
       checkStatus: options.id
     })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  jumpToNewAddress() {
    wx.navigateTo({
      url: '/pages/newAddress/newAddress',
    })
  },
  checkRadios(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      checkStatus: id
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