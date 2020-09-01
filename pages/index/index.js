//index.js
//获取应用实例
const app = getApp()
import { api } from './module.js';
const http = new api();
Page({
  data: {
    tab: 1,
    iconsData: [
      {
        img: '/images/icons/me.png',
        name: '智能选书'
      },
      {
        img: '/images/icons/me.png',
        name: '获奖作品'
      },
      {
        img: '/images/icons/me.png',
        name: '妈妈的书'
      },
      {
        img: '/images/icons/me.png',
        name: '大师作品'
      },
      {
        img: '/images/icons/me.png',
        name: '桥梁书'
      },
      {
        img: '/images/icons/me.png',
        name: '英文经典'
      }
    ],
    book: {
      src: '/images/book.png',
      name: '我大喊大叫的一天我大喊大叫的一天',
      labs: [
        {
          name: '情绪管理'
        }
      ]
    },
    newBook: {
      src: '/images/book.png',
      name: '揭秘小世界认知篇启蒙早教绘本备份',
      author: '折翼 i 沉思',
      labs: [
        {
          name: '0-2'
        }
      ]
    },
    listType: [
      {
        name: '英语读物',
        list: []
      },
      {
        name: '启蒙认识',
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
  },
  getListType() {
    let listType = this.data.listType;

    for (let i = 0; i < listType.length; i++) {
      this.getDataList(listType[i].name,2)
    }
  },
  getDataList(name,pageSize) {
    let that = this;
    let params = {
      pageNumber: 1,
      pageSize: pageSize,
      label: name
    }
    http.getBookList(params)
      .then(res => {
        console.log(res);
        let list = res.pageInfo.list;
        that.initData(name,list)
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
  },
  jumpToBookList(e) {
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/booklist/booklist?name='+name,
    })
  }
})
