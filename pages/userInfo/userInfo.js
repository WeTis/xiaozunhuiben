// pages/wishlist/wishlist.js
import { api } from './module.js';
const http = new api();
import { config } from '../../utils/config.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    uploadImg: null,
    bookName: '',
    nickName: '',
    sex: null,
    br: null,
    bookImg: '',
    info: null,
    phone: null,
    email: null,
    g: null,
    content: null,
    ava:null,
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
    // 获取当前信息
    // let info = app.globalData.userInfo;
    let info = wx.getStorageSync("userInfo") || null;
    let m = JSON.parse(info.selfData);
    this.setData({
      bookName: info.telephone,
      uploadImg: info.headImage,
      nickName: m.nickName,
      sex: m.sex,
      br: m.br,
      email: m.email,
      g: m.g,
      content: m.content,
      info: info
    })
  },
  getbookName(e) {
    let value = e.detail.value;
    this.setData({
      bookName: value
    })
  },
  getbooksName(e) {
    let value = e.detail.value;
    this.setData({
      nickName: value
    })
  },
  getbookPress(e) {
    let value = e.detail.value;
    this.setData({
      sex: value
    })
  },
  getbookphone(e) {
    let value = e.detail.value;
    this.setData({
      phone: value
    })
  },
getbookemail(e) {
  let value = e.detail.value;
  this.setData({
    email: value
  })
},
getbookg(e) {
  let value = e.detail.value;
  this.setData({
    g: value
  })
},
getcontent(e) {
  let value = e.detail.value;
  this.setData({
    content: value
  })
},
  check() {

    if (!this.data.bookName) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.nickName) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.sex) {
      wx.showToast({
        title: '请输入性别',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.br) {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none'
      })
      return false;
    }
    
    
    if (!this.data.email) {
      wx.showToast({
        title: '请填写邮箱',
        icon: 'none'
      })
      return false;
    }
    
    if (!this.data.g) {
      wx.showToast({
        title: '请填写我是？',
        icon: 'none'
      })
      return false;
    }
    
    if (!this.data.content) {
      wx.showToast({
        title: '请填写成长记录',
        icon: 'none'
      })
      return false;
    }
    return true;
  },
  submit() {
    let that = this;
    if (this.check()) {
      this.uploadImgHttp()
        .then((res) => {
          let headImage = res;
          let selfData = {
            phone: this.data.bookName,
            email: this.data.email,
            g: this.data.g,
            content: this.data.content,
            nickName: this.data.nickName,
            sex: this.data.sex,
            br: this.data.br
          }
          selfData = JSON.stringify(selfData)
          let data = {
            id: this.data.info.id,
            telephone: this.data.bookName,
            headImage: headImage,
            selfData: selfData
          }
          http.uodateUser(data)
            .then(res => {
              let info = this.data.info;
              info.telephone = data.telephone;
              info.selfData = data.selfData;
              wx.setStorageSync("userInfo", info);
              wx.showToast({
                title: '添加成功',
                icon: 'none'
              })
            })
        })
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      br: e.detail.value
    })
  },
  uploadFn() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          uploadImg: tempFilePaths
        })
      }
    })
  },
  /**
  * 上传图片到服务器
  */
  uploadImgHttp() {
    if (typeof this.data.uploadImg === 'string') {
      return new Promise((resolve, reject) => {
        resolve(this.data.uploadImg)
      })
    } else{
      let _that = this;
      wx.showLoading({
        title: '正在上传',
        mask: true
      })
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: config.api_base_url + '/user/uploadOss', // 仅为示例，非真实的接口地址
          filePath: _that.data.uploadImg[0],
          name: 'file',
          success(res) {
            const data = JSON.parse(res.data)
            wx.hideLoading();
            if (data.status == '9999') {
              _that.setData({
                ava: data.url
              })
              resolve(data.url)
            } else {
              wx.showToast({
                title: '上传图片错误',
              })
              reject('no');
            }


          }
        });

      })
    }

    
    
  },

})