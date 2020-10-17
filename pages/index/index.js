//index.js
//获取应用实例
const app = getApp()
import { api } from './module.js';
const http = new api();
Page({
  data: {
    tab: '0-2岁',
    iconsData: [
      {
        img: '/images/icons/znxs.png',
        name: '智能选书'
      },
      {
        img: '/images/icons/hj.png',
        name: '获奖作品'
      },
      {
        img: '/images/icons/mm.png',
        name: '妈妈的书'
      },
      {
        img: '/images/icons/xz.png',
        name: '小樽商城'
      },
      {
        img: '/images/icons/ds.png',
        name: '名家大师'
      },
      {
        img: '/images/icons/ql.png',
        name: '桥梁书'
      },
      {
        img: '/images/icons/ywjd.png',
        name: '英文原版'
      },
      {
        img: '/images/icons/xlzx.png',
        name: '心理咨询'
      }
    ],
    ageList: [
      {
        name: '0-2岁'
      },
      {
        name: '3-6岁'
      },
      {
        name: '7-10岁'
      },
      {
        name: '10岁以上'
      }
    ],
    newBook: [],
    ageBook: [],
    listType: [
      {
        name: '启蒙认知',
        list: []
      },
      {
        name: '情绪管理',
        list: []
      },
      {
        name: '行为习惯',
        list: []
      },
      {
        name: '品格养成',
        list: []
      },
      {
        name: '自我保护',
        list: []
      },
      {
        name: '科普百科',
        list: []
      },
      {
        name: '儿童文学',
        list: []
      },
      {
        name: '专注力',
        list: []
      },
      {
        name: '中外经典',
        list: []
      }
    ]
  },
  onLoad: function () {
    this.getListType();
    this.getnewBookList('新书推荐',3)
    this.getageBookList('', this.data.tab, 3)
  },
  search(e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: '/pages/booklist/booklist?productName=' + e.detail.value,
    })
  },
  getListType() {
    let listType = this.data.listType;

    for (let i = 0; i < listType.length; i++) {
      this.getDataList(listType[i].name,3)
    }
  },
  getDataList(name,pageSize) {
    let that = this;
    let params = {
      pageNumber: 1,
      pageSize: pageSize,
      label: name,
      productStatus: 1,
      ifBook: 1
    }
    http.getBookList(params)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;
        that.initData(name,list)
      })
  },
  /**
   * 获取新书
   */
  getnewBookList(name, pageSize) {
    let that = this;
    let params = {
      pageNumber: 1,
      pageSize: pageSize,
      label: name,
      productStatus: 1,
      ifBook: 1
    }
    http.getBookList(params)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;
        list = list.map(item => {
          item.labs = "推荐：" + item.ageAround;
          return item;
        })
        that.setData({
          newBook: list
        })
      })
  },
  // 年龄专区
  getageBookList(name, ageAround, pageSize) {
    let that = this;
    let params = {
      pageNumber: 1,
      pageSize: pageSize,
      ageAround: ageAround,
      productStatus: 1,
      ifBook: 1
    }
    http.getBookList(params)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;
        list = list.map(item => {
          item.labs = "推荐：" + item.ageAround;
          return item;
        })
        that.setData({
          ageBook: list
        })
      })
  },
  /**
   * 将获取的数据插入指定的数组中
   */
  initData(name,list) {
    let listType = this.data.listType;
    for (let i = 0; i < listType.length; i++) {
      if (listType[i].name === name) {
        listType[i].list.push(...list)
        break;
      }
    }
    this.setData({
      listType: listType
    })
  },
  clickTab(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      tab: index
    })
    this.getageBookList('', index, 3)
  },
  jumpToBookList(e) {
    let name = e.currentTarget.dataset.name;
    console.log(name)
    wx.navigateTo({
      url: '/pages/booklist/booklist?label='+name,
    })
  },
  clickItem(e) {
    let name = e.currentTarget.dataset.name;
    if(name == '智能选书') {
      this.jumpToZnxs()
    }
    if (name == '英文原版') {
      wx.navigateTo({
        url: '/pages/booklist/booklist?label=' + name,
      })
    }
    if(name == '获奖作品') {
      this.jumpToawards(name,44)
    }
    if ( name == '名家大师') {
      this.jumpToawards(name,45)
    }
    if (name == '桥梁书') {
      this.jumpToawards(name, 46)
    }

    if (name == '妈妈的书') {
      this.jumpTomm(name)
    }

    if (name == '小樽商城') {
      this.jumpTommShop()
    }
    if (name == '心理咨询') {
      wx.showToast({
        title: '功能正在开发中，敬请期待',
        icon: 'none'
      })
    }
  },
  /**
   * 跳转至智能选书
   */
  jumpToZnxs() {
    wx.navigateTo({
      url: '/pages/znxs/znxs',
    })
  },
  jumpToawards(name,id) {
    wx.navigateTo({
      url: '/pages/awards/awards?name='+name+'&id='+id,
    })
  },
  jumpTomm(name){
    wx.navigateTo({
      url: '/pages/booklist/booklist?label=' + name,
    })
  },
  jumpToHy() {
    wx.navigateTo({
      url: '/pages/hy/hy'
    })
  },
  jumpTommShop() {
    wx.navigateTo({
      url: '/pages/shop/index/index',
    })
  }
})
