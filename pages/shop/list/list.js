// pages/shop/list/list.js
import { api } from './module.js';
const http = new api();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
 
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageSize: 100,
    list: []
  },
  created() {
    this.getData();
  },
  pageLifetimes: {
    show: function () {
      console.log(88)
      // this.getData();
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      let that = this;
      let params = {
        pageNumber: 1,
        pageSize: this.data.pageSize,
        ifBook: 0
      }
      http.getBookList(params)
        .then(res => {
          console.log(res);
          let list = res.pageInfo.list;
          that.setData({
            list: list
          })
        })
    },
    jumpTodetail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/detail/detail?id='+id,
      })
    }
  }
})
