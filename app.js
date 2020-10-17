//app.js
import { config } from './utils/config.js';
App({
  onLaunch: function (scene) {
    console.log(scene)
    // 是否从分享会员卡进入
    if (scene.path == 'pages/hy/hy') {
      if (scene.query.scene) {
        let memberCode = scene.query.scene;
        let levelType = scene.query.levelType;
        this.globalData.memberCode = memberCode;
        this.globalData.levelType = levelType;
      }
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    let session = wx.getStorageSync("session") || null;

    // 登录
    if (session) {
      // 已经注册
      wx.showLoading({
        title: '正在登陆',
      })
      // 自动登陆
      wx.login({
        success: res => {
          console.log(res);
          let code = res.code;
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo;
                    wx.request({
                      url: config.api_base_url + '/wxuser/onLogin',
                      data: {
                        code: code,
                        headImage: res.userInfo.avatarUrl,
                        username: res.userInfo.nickName,
                        userType: 1
                      },
                      header: {
                        "content-type": 'application/x-www-form-urlencoded'
                      },
                      method: "POST",
                      success: (res) => {
                        console.log(res);
                        let type = res.data.user.userType;
                        wx.setStorageSync("session", res.data.token);
                        wx.setStorageSync("userInfo", res.data.user);
                        this.globalData.userInfo = res.data.user;
                        wx.hideLoading()
                        // if (scene.path != 'pages/info/info') {
                          // wx.reLaunch({
                          //   url: '/pages/index/index'
                          // });
                        // }

                      },
                      fail: () => {
                        wx.hideLoading()
                      }
                    })

                  }
                })
              }
              else {
                // 请打开授权
                wx.hideLoading()
              }
            },
            fail: res => {
              wx.hideLoading()
            }
          })
        },
        fail: res => {
          wx.hideLoading()
        }
      })
    } else {
      // 未注册
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(scene) {
    console.log('---')
    if (scene.path == 'pages/hy/hy') {
      if (scene.query.scene) {
        let memberCode = scene.query.scene;
        let levelType = scene.query.levelType;
        this.globalData.memberCode = memberCode;
        this.globalData.levelType = levelType;
      }
    }
  },
  globalData: {
    userInfo: null,
    memberCode: null,
    levelType: null
  }
})