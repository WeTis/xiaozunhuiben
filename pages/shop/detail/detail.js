// pages/book/book.js
import { api } from './module.js';
const http = new api();
import { isLogin } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPropBox: false,
    product: {},
    labs: null,
    id: null,
    clist:[],
    evaluate: {
      src: "/images/icons/me.png",
      name: "用户1",
      time: "2020-09-01",
      content: "用户的品佳不错啊",
      score: 4
    },
    des: [
      {
        icon: 'icon-2',
        n: '正品保障',
        d: '小樽绘本承诺所有商品均为正品'
      },
      {
        icon: 'icon-4',
        n: '往返包邮',
        d: '平台往返包邮，用户可以通过平台预约指定快递公司，无需支付邮费'
      },
      {
        icon: 'icon-shangpin',
        n: '百万商品',
        d: '平台绘本数量超过100万，原版绘本占比超过30%'
      },
      {
        icon: 'icon-anquanzhuye',
        n: '安全消毒',
        d: '所有绘本均有专人维护和保养，采用二级臭氧消毒，确保宝宝安全使用                                                                                       '
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id: id
    })
    this.getDetail(id)
  },
  buy() {
    if (!isLogin()) {
      return false;
    }
    // 组建内容
    let pojo = [];
    let product = this.data.product;
    // let list = this.data.list;
    // console.log(list)
    // for (let i = 0; i < list.length; i++) {
    //   let item = list[i]
    //   if (item.check) {
        pojo.push({
          productCount: 1,
          productId: product.id,
          productImage: product.productImage,
          productName: product.productName,
          productPrice: product.productPrice
        })
    //   }
    // }


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
  addCard() {
    if (!isLogin()) {
      return false;
    }
    let id = this.data.id;
    let data = {
      productId: id,
      type: 2
    }
    http.addcard(data)
      .then(res => {
        console.log(res)
      })
  },
  jumpToEvaluatelist() {
    wx.navigateTo({
      url: '/pages/evaluatelist/evaluatelist?id='+this.data.id,
    })
  },
  showPropBoxFn() {
    let showPropBox = this.data.showPropBox;
    console.log(1)
    this.setData({
      showPropBox: !showPropBox
    })
  },
  jumpToCard() {
    wx.navigateTo({
      url: "/pages/shop/index/index?clickName=购物车",
    })
  },
  getDetail(productId) {
    let data = {
      productId: productId
    };
    http.getOneProduct(data)
      .then(res => {
        console.log(res)
        let labs = res.product.productLabel + ',' + res.product.ageAround
        let clist = res.list.length > 2 ? [
          (res.list)[0],
          (res.list)[1],
          (res.list)[2]
        ]
        : res.list;
        let m = res.product.detailImage ? res.product.detailImage.split('$^*$') : []
        res.product.detailImage = m
        this.setData({
          product: res.product,
          labs: labs,
          clist: clist 
        })
      })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})