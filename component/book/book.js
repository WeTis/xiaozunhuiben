// component/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    showLab: { // 属性名
      type: Boolean,
      value: false
    },
    showauthor: {
      type: Boolean,
      value: false
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    jumpTobook(e) {
      let id = e.currentTarget.dataset.id;
      if (this.data.book.ifBook == 1) {
        wx.navigateTo({
          url: '/pages/book/book?id=' + id,
        })
      } else {
        wx.navigateTo({
          url: '/pages/shop/detail/detail?id=' + id,
        })
      }
      
    }
  }
})
