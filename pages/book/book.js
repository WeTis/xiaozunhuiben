// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPropBox: false,
    evaluate: {
      src: "/images/icons/me.png",
      name: "用户1",
      time: "2020-09-01",
      content: "用户的品佳不错啊",
      score: 4
    },
    des: [
      {
        icon: 'icon-ziyuanldpi',
        n: '正品保障',
        d: '小樽绘本承诺所有商品均为正品'
      },
      {
        icon: 'icon-ziyuanldpi',
        n: '往返包邮',
        d: '平台往返包邮，用户可以通过平台预约指定快递公司，无需支付邮费'
      },
      {
        icon: 'icon-ziyuanldpi',
        n: '百万商品',
        d: '平台绘本数量超过100万，原版绘本占比超过30%'
      },
      {
        icon: 'icon-ziyuanldpi',
        n: '安全消毒',
        d: '所有绘本均有专人维护和保养，采用二级臭氧消毒，确保宝宝安全使用                                                                                       '
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  jumpToEvaluatelist() {
    wx.navigateTo({
      url: '/pages/evaluatelist/evaluatelist',
    })
  },
  showPropBoxFn() {
    let showPropBox = this.data.showPropBox;
    console.log(1)
    this.setData({
      showPropBox: !showPropBox
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