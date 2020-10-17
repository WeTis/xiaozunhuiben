// pages/newAddress/newAddress.js
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked:false,
    region: [],
    customItem: '全部',
    receiveAdress: '',
    receivePhone: '',
    receiveName: '',
    derss:"", // 详细地址
    id: null,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.info) {
      let info = JSON.parse(options.info);
      let receiveAdress = (info.receiveAdress).split('$$')
      let region = (receiveAdress[0]).split(',')
      let derss = receiveAdress.length > 1 ?  receiveAdress[1] : ''
      this.setData({
        receivePhone: info.receivePhone,
        receiveName: info.receiveName,
        region: region,
        derss: derss,
        id: info.id,
        type: 2
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

  },
  getreceiveName(e) {
    let value = e.detail.value;
    this.setData({
      receiveName: value
    })
  },
getreceivePhone(e) {
  let value = e.detail.value;
  this.setData({
    receivePhone: value
  })
},
getDerss(e) {
  let value = e.detail.value;
  this.setData({
    derss: value
  })
},
  check() {
    if (!this.data.receiveName) {
      wx.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.receivePhone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.derss) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.region[0]) {
      wx.showToast({
        title: '请选择所在省市区',
        icon: 'none'
      })
      return false;
    }

    return true;
  },
  submit() {
    let that = this;
    if(this.check()) {
      let data = {
        receiveAdress: ((this.data.region).join()) + '$$' + this.data.derss,
        receivePhone: this.data.receivePhone,
        receiveName: this.data.receiveName,
        type: this.data.type
      }
      if(this.data.id) {
        data.id = this.data.id;
      }
      http.userAdress(data)
      .then(res => {
        if(res.status == '9999') {
          // wx.showToast({
          //   title: '成功',
          //   icon: 'success'
          // })
          // if (that.data.switch1Checked) {
          //   wx.setStorage({
          //     key: "address",
          //     data: data,
          //     success: () => {
          //       wx.navigateBack();
          //     }
          //   })
          // }else {
            wx.navigateBack();
          // }
          
          
        }else{
          wx.showToast({
            title: '操作失败',
            icon: 'fail'
          })
        }
      })
    }
  },
  switch1Change(e) {
    this.setData({
      switch1Checked: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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