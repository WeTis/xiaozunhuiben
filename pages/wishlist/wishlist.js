// pages/wishlist/wishlist.js
import { api } from './module.js';
const http = new api();
import { config } from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    uploadImg: null,
    bookName: '',
    booksName: '',
    bookAuthor:'',
    bookPress: '',
    pressDate: '',
    bookImg: ''
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
  getbookName(e) {
    let value = e.detail.value;
    this.setData({
      bookName :value
    })
  },
getbooksName(e) {
  let value = e.detail.value;
  this.setData({
    booksName:value
  })
},
getbookAuthor(e) {
  let value = e.detail.value;
  this.setData({
    bookAuthor :value
  })
},
getbookPress(e) {
  let value = e.detail.value;
  this.setData({
    bookPress:value
  })
},
check() {
  if (!this.data.bookName) {
    wx.showToast({
      title: '请输入书名',
      icon: 'none'
    })
    return false;
  }

  // if (!this.data.booksName) {
  //   wx.showToast({
  //     title: '请输入系列名',
  //     icon: 'none'
  //   })
  //   return false;
  // }
  if (!this.data.bookAuthor) {
    wx.showToast({
      title: '请输入作者',
      icon: 'none'
    })
    return false;
  }

  if (!this.data.bookPress) {
    wx.showToast({
      title: '请输入出版社',
      icon: 'none'
    })
    return false;
  }

  if (!this.data.date) {
    wx.showToast({
      title: '请选择出版日期',
      icon: 'none'
    })
    return false;
  }

  // if (!this.data.uploadImg) {
  //   wx.showToast({
  //     title: '请上传书籍图片',
  //     icon: 'none'
  //   })
  //   return false;
  // }

  return true;
},
  submit() {
    let that = this;
    if (this.check()) {
      this.uploadImgHttp(() => {


        let data = {
          bookName: that.data.bookName,
          booksName: that.data.booksName,
          bookAuthor: that.data.bookAuthor,
          bookPress: that.data.bookPress,
          pressDate: that.data.date
        }
        if (this.data.bookImg) {
          data.imageUrl = this.data.bookImg;
        }
        http.addWishBook(data)
          .then(res => {
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
      date: e.detail.value
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
  uploadImgHttp(fn) {
    if (this.data.uploadImg) {
      let _that = this;
      wx.showLoading({
        title: '正在上传',
        mask: true
      })
      wx.uploadFile({
        url: config.api_base_url + '/user/uploadOss', // 仅为示例，非真实的接口地址
        filePath: _that.data.uploadImg[0],
        name: 'file',
        success(res) {
          const data = JSON.parse(res.data)
          _that.setData({
            bookImg: data.url
          })
          wx.hideLoading();
          fn && fn();
        }
      });
    } else {
      fn && fn();
    }
    
  },
 
})