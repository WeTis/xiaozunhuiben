// pages/awards/awards.js
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    blank: {
      icon: 'icon-shujia-xuanzhong',
      dist: '暂无图书',
      btnText: null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.name;
    wx.setNavigationBarTitle({
      title: name
    })
    let blank = this.data.blank;
    blank.dist = '暂无'+name;
    this.setData({
      blank: blank
    })
    this.getData(options.id)
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
  getData(id) {
    let data = {
      labelSort: id
    }
    http.productLabelList(data)
    .then(res => {
      console.log(res)
      let arr = [];
      let list = res.list;
      // for(let i = 0; i < list.length; i++) {
      //   if(list[i].labelSort == id) {
      //     arr.push(list[i])
      //   }
      // }
      this.setData({
        list: list
      })
    })
  },
  jumpToBooklist(e) {
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/booklist/booklist?label=' + name +"&isShowNavBar=true",
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