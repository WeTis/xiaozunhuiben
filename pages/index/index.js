//index.js
//获取应用实例
const app = getApp()

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
      src: '/images/icons/me.png',
      name: '我大喊大叫的一天我大喊大叫的一天',
      labs: [
        {
          name: '情绪管理'
        }
      ]
    },
    listType: [
      {
        name: '启蒙认识'
      },
      {
        name: '情绪管理'
      },
      {
        name: '行为习惯'
      },
      {
        name: '品格养成'
      },
      {
        name: '自我保护'
      },
      {
        name: '科普百科'
      },
      {
        name: '儿童文学'
      },
      {
        name: '专注力'
      },
      {
        name: '中外经典'
      }
    ]
  },
  onLoad: function () {
    
  },
  clickTab(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      tab: index
    })
  },
  jumpToBookList() {
    wx.navigateTo({
      url: '/pages/booklist/booklist',
    })
  }
})
