// pages/booklist/booklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectType: '全部',
    listType: [
      {
        name: '全部'
      },
      {
        name: '启蒙认识'
      },
      {
        name: '情绪管理'
      },
      {
        name: '行为习惯'
      },
      {
        name: '品格养成'
      },
      {
        name: '自我保护'
      },
      {
        name: '科普百科'
      },
      {
        name: '儿童文学'
      },
      {
        name: '专注力'
      },
      {
        name: '中外经典'
      }
    ],
    book: {
      src: '/images/icons/me.png',
      name: '我大喊大叫的一天我大喊大叫的一天',
      labs: [
        {
          name: '情绪管理'
        }
      ]
    }
  },
  clickType(e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      selectType: name
    })
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