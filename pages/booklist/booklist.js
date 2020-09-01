// pages/booklist/booklist.js
import { api } from './module.js';
const http = new api();
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
        name: '0-2岁'
      },
      {
        name: '2-5岁'
      },
      {
        name: '5-12岁'
      },
    ],
    pageNumber: 1,
    list: [],
    book: {
      src: '/images/book.png',
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
    console.log(options)
    let name = options.name;
    this.getData(name)
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
  getData(name) {
    let that = this;
    let params = {
      pageNumber: this.data.pageNumber,
      pageSize: 15,
      label: name
    }
    http.getBookList(params)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;
        that.initData(name, list)
      })
  },
  initData(name,list) {
    for(let i = 0; i < list.length; i++) {
      list[i].labs = name + ',' + list[i].ageAround
    }
    this.setData({
      list: list
    })
  },
  handlerGobackClick() {
    wx.navigateBack({
      delta: 1
    })
  },
  handlerGohomeClick(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})