// pages/shop/index/index.js
const app = getApp()
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickName:'商品',
    nav: [
      {
        icon: 'icon-shangpingouwudai2',
        name: '商品',
        id: 1
      },
      {
        icon: 'icon-gouwucheman',
        name: '购物车',
        id:2
      },
      {
        icon: 'icon-icon',
        name: '订单',
        id: 3
      }
    ],
    pageSize: 100,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.clickName) {
      this.setData({
        clickName: options.clickName
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
    // this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  clickNav(e){
    let name = e.currentTarget.dataset.name;
    this.setData({
      clickName: name
    })
    wx.setNavigationBarTitle({
      title: name
    })
  },
  getData() {
    let that = this;
    let params = {
      pageNumber: 1,
      pageSize: pageSize,
      ifBook: 0
    }
    http.getBookList(params)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;
        that.setData({
          list: list
        })
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})