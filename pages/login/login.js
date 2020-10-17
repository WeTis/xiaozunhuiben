// pages/login/login.js
import { config } from '../../utils/config.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  getUserInfo(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      let userInfo = e.detail.userInfo;
      this.login(userInfo, (res) => {
        this.resqusetHttp(res);
      })
    } else {
      // 获取失败
      wx.showModal({
        title: '授权失败',
        content: '授权失败，主要功能将无法使用，是否重新授权？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // 用户点击确定留在当前页
          } else if (res.cancel) {
            console.log('用户点击取消');
            // 返回主界面
          }
        }
      })
    }
  },
  login(data, fn) {
    wx.showLoading({
      title: '正在授权',
    })
    wx.login({
      success: res => {
        let code = res.code;
        let params = {
          code: code,
          headImage: data.avatarUrl,
          username: data.nickName,
          userType: 1
        }
        fn && fn(params);
      }
    })
  },
  resqusetHttp(params) {
    let that = this;
    wx.request({
      url: config.api_base_url + '/wxuser/onLogin',
      data: params,
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: (res) => {
        // 保存session
        let data = res.data;
        if (data.status = 9999) {
          // 授权成功
          wx.setStorageSync("session", data.token);
          wx.setStorageSync("userInfo", res.data.user);
          app.globalData.userInfo = res.data.user;
          wx.hideLoading();
          wx.navigateBack();
        }
      }
    })
  },
  cancelLogin() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})