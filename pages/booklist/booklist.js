// pages/booklist/booklist.js
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectType: '',
    listType: [
      {
        name: '全部',
        value: ''
      },
      {
        name: '0-2岁',
        value: '0-2岁'
      },
      {
        name: '3-6岁',
        value: '3-6岁'
      },
      {
        name: '7-10岁',
        value: '7-10岁'
      },
      {
        name: '10岁以上',
        value: '10岁以上'
      }
    ],
    pageNumber: 1,
    list: [],
    isShowNavBar: true,
    params:{
      pageNumber: 1,
      pageSize: 15,
      label: '',
      ageAround: '', 
      ifBook: 1,
      productStatus: 1
    },
    blank: {
      icon: 'icon-shujia-xuanzhong',
      dist: '暂无图书',
      btnText: null
    }
  },
  clickType(e) {
    let name = e.currentTarget.dataset.name;
    let params = this.data.params;
    params.ageAround = name;
    params.pageNumber = 1;
    
    this.setData({
      selectType: name,
      params: params
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = this.data.params;
    params = { ...params,...options}
    this.setData({
      params: params
    })
    if (options.isShowNavBar) {
      this.setData({
        isShowNavBar: false
      })
    }
    this.getData()
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
    let params = this.data.params;
    let newParams = {};
    for(let key in params) {
      if(params[key]) {
        if (key == 'pageSize' || key == 'pageNumber'){
          newParams[key] = params[key] * 1
        } else {
          newParams[key] = params[key]
        }
        
      }
    }
    console.log(newParams);
    http.getBookList(newParams)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;

        that.initData(newParams.label, list)
      })
  },
  initData(name,list) {
    for(let i = 0; i < list.length; i++) {
      if (name){
        list[i].labs = name + ',' + list[i].ageAround
      }else{
        list[i].labs = list[i].ageAround
      }
      
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