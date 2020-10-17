// pages/znxs/znxs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: [
      {
        name: '0-2岁',
        checked: false
      },
      {
        name: '3-6岁',
        checked: false
      },
      {
        name: '7-10岁',
        checked: false
      },
      {
        name: '10岁以上',
        checked: false
      }
    ],
    listType: [
      {
        name: '英文绘本',
        checked: false,
        list: []
      },
      {
        name: '启蒙认知',
        checked: false,
        list: []
      },
      {
        name: '情绪管理',
        checked: false,
        list: []
      },
      {
        name: '行为习惯',
        checked: false,
        list: []
      },
      {
        name: '品格养成',
        checked: false,
        list: []
      },
      {
        name: '自我保护',
        checked: false,
        list: []
      },
      {
        name: '科普百科',
        checked: false,
        list: []
      },
      {
        name: '儿童文学',
        checked: false,
        list: []
      },
      {
        name: '专注力',
        checked: false,
        list: []
      },
      {
        name: '中外经典',
        checked: false,
        list: []
      }
    ],
    books: [
      {
        name: '4',
        checked: false
      },
      {
        name: '6',
        checked: false
      },
      {
        name: '8',
        checked: false
      },
      {
        name: '10',
        checked: false
      },
      {
        name: '15',
        checked: false
      }
    ]
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
  handlerGobackClick() {
    wx.navigateBack({
      delta: 1
    })
  },
  handlerGohomeClick() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  clickAge(e) {
    let index = e.currentTarget.dataset.index;
    let age = this.data.age;
    age = age.map(item => {
      item.checked = false;
      return item;
    })
    age[index].checked = !age[index].checked;

    this.setData({
      age:age
    })
  },
  clickBooks(e) {
    let index = e.currentTarget.dataset.index;
    let books = this.data.books;
    books = books.map(item => {
      item.checked = false;
      return item;
    })
    books[index].checked = !books[index].checked;

    this.setData({
      books: books
    })
  },
  clickList(e) {
    let index = e.currentTarget.dataset.index;
    let listType = this.data.listType;
    let length = 0;
    listType.map(item => {
      if(item.checked) {
        length++
      }
    })
    if(length < 3) {
      listType[index].checked = !listType[index].checked;
    }else{
      listType[index].checked = false;
    }
    this.setData({
      listType: listType
    })
  },
  submit() {
    // 判断是否选择了
    let age = null;
    (this.data.age).map(item => {
      if(item.checked) {
        age =  item.name;
      }
    })
    if (!age) {
      wx.showToast({
        title: '请选择年龄',
        icon: 'none'
      })
      return false;
    }

    let listType = [];
    (this.data.listType).map(item => {
      if (item.checked) {
        listType.push(item.name)
      }
    })

    if (listType.length == 0) {
      wx.showToast({
        title: '请选择分类',
        icon: 'none'
      })
      return false;
    }

    let pageSize = null;
    (this.data.books).map(item => {
      if(item.checked) {
        pageSize = item.name;
      }
    })
    
    if (!pageSize) {
      wx.showToast({
        title: '请选择本数',
        icon: 'none'
      })
      return false;
    }
    
    wx.navigateTo({
      url: '/pages/booklist/booklist?label=' + listType.join() + '&pageSize=' + pageSize*1 + '&ageAround=' + age,
    })
  }
})