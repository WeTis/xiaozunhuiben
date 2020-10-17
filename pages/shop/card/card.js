// pages/shop/card/card.js
import { isLogin } from '../../../utils/util.js';
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
  lifetimes: {
    attached: function () {
      if (!isLogin()) {
        
      }else {
        // 获取购物车列表
        this.getList()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      
    ],
    allChecked: false,
    count: 0,
    money: 0,
    productId: [],
    blank: {
      icon: 'icon-shujia-xuanzhong',
      dist: '暂无绘本',
      btnText: null
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getList() {
      let data = {
        type: 2
      }
      http.getcard(data)
        .then(res => {
          let list = res.list;
          list = list.map(item => {
            item.check = false;
            return item;
          })
          this.setData({
            list: list,
            allChecked: false,
            count: 0,
            money: 0,
          })
        })
    },
    addNum(e) {
      let index = e.currentTarget.dataset.index;
      let item = (this.data.list);
      // if(item.count)
      item[index].productCount = item[index].productCount+1;
      this.setData({
        list: item
      })
      this.checkSelectNum(item)
      this.addCard(item[index].productId);
    },
    preNum(e) {
      let index = e.currentTarget.dataset.index;
      let item = (this.data.list);
      if (item[index].productCount > 1) {
        item[index].productCount = item[index].productCount - 1;
        this.setData({
          list:item
        })
      }
      this.checkSelectNum(item)
      // 删除对应的书
      this.delectCard(item[index].productId);
    },
    addCard(id) {
      if (!isLogin()) {
        return false;
      }
      let data = {
        productId: id,
        type: 2
      }
      http.addcard(data)
        .then(res => {
          console.log(res)
          wx.showToast({
            title: '添加成功',
          })
          this.getList()
        })
    },
    jumpToBooks(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/detail/detail?id=' + id,
      })
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
        let o = { ...item };
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
      let money = 0;
      let productId = []
      let m = list.map(item => {
        if (item.check) {
          count++
          money = money + (item.productPrice * item.productCount);
          productId.push(item.productId)
        }
      })
       
      // if (count > 5) {
      //   wx.showToast({
      //     title: '每次最多选择五本书',
      //     icon: 'none'
      //   })
      //   return false;
      // }
      console.log(99)
      if (count == list.length) {
        allChecked = true;
      } else {
        allChecked = false;
      }
      this.setData({
        count: count,
        list: list,
        allChecked: allChecked,
        money: money,
        productId: productId
      })
    },
    jumpTosubmitOrder() {
      // 组建内容
      let pojo = [];
      let list = this.data.list;
      console.log(list)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.check) {
          pojo.push({
            productCount: item.productCount,
            productId: item.productId,
            productImage: item.productImage,
            productName: item.productName,
            productPrice: item.productPrice
          })
        }
      }


      wx.setStorage({
        key: "pojo",
        data: pojo,
        success: () => {
          wx.navigateTo({
            url: '/pages/submitOrder/submitOrder?type=shop',
          })
        }
      })

    },
    delectCard() {
      let data = {
        type: 2,
        productId: (this.data.productId).join()
      };
      http.clearCard(data)
        .then(res => {
          // 删除成功重新获取
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          }) 
          this.getList()
        })
    },
    delectCard(id) {
      let data = {
        type: 2,
        productId: id
      };

      http.clearCard(data)
        .then(res => {
          // 删除成功重新获取
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          }) 
          this.getList()
        })
    }
  }
})
