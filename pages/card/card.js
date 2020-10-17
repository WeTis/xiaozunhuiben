// pages/card/card.js
import { isLogin, isBuy, orderNumFN} from '../../utils/util.js';
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
    ],
    allChecked: false,
    count: 0,
    hInfo: {},
    blank: {
      icon: 'icon-shujia-xuanzhong',
      dist: '暂无绘本',
      btnText: null
    },
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
    if (!isLogin(true)) {
       
    } else {
      // let hInfo = isBuy();
      // this.setData({
      //   hInfo: hInfo
      // })
      this.getList();
    }
    
  },
  getList() {
    let data = {
      type: 1
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
  delect(){
    let productId = [];
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.check) {
        productId.push(item.productId)
      }
    }
    let data = {
      type: 1,
      productId: productId.join()
    };
    http.clearCard(data)
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'cuccess'
        })
        this.getList();
      })
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
    
    if(count > 6) {
      wx.showToast({
        title: '每次最多选择6本书',
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
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/book/book?id='+ id,
    })
  },
  jumpTosubmitOrder() {
    let hInfo = this.data.hInfo
    orderNumFN((res) => {
      if(res.complete == res.all) {
        // 组建内容
        let pojo = [];
        let list = this.data.list;
        console.log(list)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.check) {
            pojo.push({
              productCount: 1,
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
              url: '/pages/submitOrder/submitOrder',
            })
          }
        })
      }else {
        wx.showToast({
          title: '您有借书订单未完成，请先完成订单',
          icon: 'none'
        })
      }
    })
    if (!isBuy(true)) {
     return false;
    }
    
    
  }
})