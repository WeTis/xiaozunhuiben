// pages/book/book.js
import { isLogin } from '../../utils/util.js';
import { api } from './module.js';
const http = new api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPropBox: false,
    tabActive: 1,
    product: {},
    labs: null,
    clist:[],
    id: null,
    cardproductId: false,
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
  changeActive1() { 
    this.setData({
      tabActive: 1
    })
  },
  changeActive2(){
    this.setData({
      tabActive: 2
    })
  },
  tixi() {
    let data = {
      productId: this.data.id
    }
    http.insertAdvice(data)
      .then(res => {
        wx.showToast({
          title: '已添加到到货提醒',
        })
      })
  },
  card(){
    wx.reLaunch({
      url: '/pages/card/card'
    });
  },
  addCard(){
    if (!isLogin()) {
      return false;
    }
    let id = this.data.id;
    // if ((this.data.cardproductId).indexOf(id) == -1) {
    //   wx.showToast({
    //     title: ',
    //   })
    // }
    
    
    let data = {
      productId: id,
      type: 1
    }
    http.addcard(data) 
     .then(res => {
       console.log(res)
       wx.showToast({
         title: '添加成功',
       })
       this.setData({
         cardproductId: true
       })
     })
  },
  jumpToEvaluatelist() {
    wx.navigateTo({
      url: '/pages/evaluatelist/evaluatelist',
    })
  },
  showPropBoxFn() {
    let showPropBox = this.data.showPropBox;
    console.log(1)
    this.setData({
      showPropBox: !showPropBox
    })
  },
  getDetail(productId) {
    let data = {
      productId: productId
    };
    http.getOneProduct(data) 
    .then(res => {
      this.getList(productId*1)
      let labs = res.product.productLabel + ',' + res.product.ageAround
      // let clist = res.list.length > 2 ? [
      //   (res.list)[0],
      //   (res.list)[1],
      //   (res.list)[2]
      // ]
      //   : res.list;
      let m = res.product.detailImage ? res.product.detailImage.split('$^*$') : []
      res.product.detailImage = m
       this.setData({
         product: res.product,
         labs: labs,
         clist: res.list 
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
  getList(id) {
    let data = {
      type: 1
    }
    http.getcard(data)
      .then(res => {
        let list = res.list;
        let m = list.map(item => {
          return item.productId;
        })
        console.log(m.indexOf(id),m,id)
        if(m.indexOf(id) != -1){
          this.setData({
            cardproductId: true
          })
        }
        
      })
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