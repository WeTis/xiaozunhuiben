// pages/address/address.js
import { api } from './module.js';
const http = new api();
const app = getApp()

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
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  getData() {
    let data = {
      type: 4,
      pageSize: 100,
      pageNumber: 1
    }
    http.userAdress(data)
    .then(res => {
      let list = res.pageInfo.list;

      this.setData({
        address: list
      })
    })
  },
  delectFn(id) {
    let data = {
      type: 3,
      id: id
    }
    http.userAdress(data)
      .then(res => {
        if(res.status == '9999') {
          this.getData();
        }else {
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      })
  },
  delect(e) {
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除此地址吗?',
      success(res) {
        if (res.confirm) {
           this.delectFn(id);
        } else if (res.cancel) {

        }
      }
    })
  },
  edit(e) {
    let index = e.currentTarget.dataset.index;
    let info = JSON.stringify((this.data.address)[index]);

    wx.navigateTo({
      url: '/pages/newAddress/newAddress?info='+info,
    })
  },
  jumpToNewAddress() {
    wx.navigateTo({
      url: '/pages/newAddress/newAddress',
    })
  },
  checkRadios(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.setData({
      checkStatus: id
    })
    let data = (this.data.address)[index]
    wx.setStorage({
      key: "address",
      data: data,
      success: () => {
        wx.navigateBack();
      }
    })
  },
  
})