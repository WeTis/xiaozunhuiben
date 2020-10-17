// pages/evaluatelist/evaluatelist.js
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let id = options.id;
    this.getDetail(id);
  },

  getDetail(productId) {
    let data = {
      productId: productId
    };
    http.getOneProduct(data)
      .then(res => {
        let clist = res.list;
        this.setData({
          clist: clist
        })
      })
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