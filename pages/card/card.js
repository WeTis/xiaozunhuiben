// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 1,
        name: '最喜爱的妈妈（宫西达也）',
        img: '/images/1.jpg',
        check: false
      },
      {
        id: 2,
        name: '最喜爱的妈妈（宫西达也）',
        img: '/images/1.jpg',
        check: false
      },
      {
        id: 3,
        name: '最喜爱的妈妈（宫西达也）',
        img: '/images/1.jpg',
        check: false
      },
      {
        id: 4,
        name: '最喜爱的妈妈（宫西达也）',
        img: '/images/1.jpg',
        check: false
      }
    ],
    allChecked: false,
    count: 0
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

  checkedFn(e) {
    let index = e.currentTarget.dataset.index;
    let list = (this.data.list).map(item => {
      let o = { ...item };
      return o;
    })
    list[index].check = !list[index].check;
    this.checkSelectNum(list)
  },
  allCheckedFn() {
    let allChecked = !this.data.allChecked;
    let m = (this.data.list).map(item => {
      let o = {...item};
      o.check = allChecked;
      return o;
    })
    console.log(this.data.list)
    this.checkSelectNum(m)
  },
  /**
   * 判断当前选中了多少
   */
  checkSelectNum(list) {
    let count = 0;
    let allChecked;
    let m = list.map(item => {
      if( item.check) {
        count++
      }
    })
    
    if(count > 5) {
      wx.showToast({
        title: '每次最多选择五本书',
        icon: 'none'
      })
      return false;
    }
    console.log(99)
    if(count == list.length) {
      allChecked = true;
    }else {
      allChecked = false;
    }
    this.setData({
      count: count,
      list: list,
      allChecked: allChecked
    })
  },
  jumpToBooks(e) {
    wx.navigateTo({
      url: '/pages/book/book',
    })
  },
  jumpTosubmitOrder() {
    wx.navigateTo({
      url: '/pages/submitOrder/submitOrder',
    })
  }
})