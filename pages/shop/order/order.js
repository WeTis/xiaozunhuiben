// pages/shop/order/order.js
import { isLogin, formatTime } from '../../../utils/util.js';
const app = getApp()
import { api } from './moudle.js';
const http = new api();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabActive: 1,
    score: 1,
    orderStatus: null,
    x: 0,
    selectInfo: null,
    tab: [
      {
        name: "全部订单",
        id: 1,
        orderStatus: null
      },
      {
        name: "待付款",
        id: 2,
        orderStatus: 0,
      },
      {
        name: "待发货",
        id: 3,
        orderStatus: 1
      },
      {
        name: "待收货",
        id: 4,
        orderStatus: 4
      },
      {
        name: "待评价",
        id: 7,
        orderStatus: 9
      },
      {
        name: "待退款",
        id: 8,
        orderStatus: 6
      },
      {
        name: "已退款",
        id: 9,
        orderStatus: 7
      },
      {
        name: "已完成",
        id: 10,
        orderStatus: 10
      }
    ],
    blank: {
      icon: 'icon-shujia-xuanzhong',
      dist: '暂无订单',
      btnText: null
    },
    kdName: null,
    kdNumber: null,
    showDialog: false,
    orderNumber: null,
    orderId: null,
    kdId: null,
    showDialogP: false,
    content: null
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  created() {
    // 获取订单
  },
  lifetimes: {
    attached: function () {
      if (!isLogin()) {

      } else {
       
        this.getOrderList()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    jumpToOrderDetail(e) {
      let { orderid, ordernumber, enddate, startdate } = e.currentTarget.dataset;
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?orderid=' + orderid +
          '&ordernumber=' + ordernumber + '&enddate=' + enddate + '&startdate=' + startdate + '&ifBook=1',
      })
    },
    getOrderList() {
      // 订单状态  0：待付款  1：代发货 2：前台确认支付  4：待收货  5： 待归还  6：待退款  7：已退款 8：客户已签收 9：平台已签收
      let data = {
        pageSize: 100,
        pageNumber: 1,
        userId: app.globalData.userInfo.id,
        orderType: 2
      }
      if (this.data.orderStatus != null) {
        data.orderStatus = this.data.orderStatus;
      }
      http.getOrderList(data)
        .then(res => {

          let list = res.pageInfo.list;
          list = list.map(item => {
            item.startTime = formatTime(new Date(item.createDate))
            let date1 = new Date(item.createDate);
            date1.setDate(date1.getDate() + 30)
            item.endTime = formatTime(date1)
            return item
          })
          this.setData({
            list: list
          })
        })
    },

    changeOrderStatus(e) {
      let { orderid, status } = e.currentTarget.dataset;
      this.changeOrderStatusFn(orderid, status);
    },
    changeOrderStatusFn(orderid, status, fn) {
      let data = {
        id: orderid,
        status: status
      }
      http.changeOrderStatus(data)
        .then(res => {
          // 查看订单详情
          wx.showToast({
            title: '操作成功',
            icon: 'success'
          })
          fn && fn();
          this.getOrderList();
        })
    },
    /**
  * 退款
  */
    tuikaun(e) {
      let { orderid } = e.currentTarget.dataset;
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定申请退款',
        success(res) {
          if (res.confirm) {
            that.changeOrderStatusFn(orderid, 6);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    },
    clickTab(e) { //更换资讯大类

      let { index, id } = e.currentTarget.dataset;
      this.setData({
        list: []
      })
      this.changeTab(index, id);
      // this.triggerEvent("switchTap", type); //点击了导航,通知父组件重新渲染列表数据

    },
    changeTab(index, id) {
      let screenWidth = wx.getSystemInfoSync().windowWidth;

      let itemWidth = screenWidth / 5;


      const { tab } = this.data;

      let scrollX = itemWidth * index - itemWidth * 2;

      let maxScrollX = (tab.length + 1) * itemWidth;

      if (scrollX < 0) {
        scrollX = 0;
      } else if (scrollX >= maxScrollX) {
        scrollX = maxScrollX;
      }

      this.setData({
        x: scrollX,
        tabActive: id,
        orderStatus: tab[index].orderStatus
      })
      this.getOrderList();
    },
    open(e) {
      let { orderid, ordernumber } = e.currentTarget.dataset;
      this.setData({
        showDialog: true,
        orderNumber: ordernumber,
        orderId: orderid
      })
    },
    getkdName(e) {
      let value = e.detail.value;
      this.setData({
        kdName: value
      })
    },
    getkdNumber(e) {
      let value = e.detail.value;
      this.setData({
        kdNumber: value
      })
    },
    hideDialog() {
      this.setData({
        showDialog: false
      })
    },
    submiKd() {
      if (!this.data.kdNumber) {
        wx.showToast({
          title: '请输入快递单号',
          icon: 'none'
        })
        return false;
      }
      if (!this.data.kdName) {
        wx.showToast({
          title: '请输入快递公司',
          icon: 'none'
        })
        return false;
      }

      let that = this;
      let data = {
        orderNumber: this.data.orderNumber,
        kdNumber: this.data.kdNumber + '$$' + this.data.kdName,
        type: 1,
        orderId: this.data.orderId
      }
      if (this.data.orderStatus === 8) {
        data.type = 2;
        data.id = this.data.kdId
      }
      http.insertOrderKd(data)
        .then(res => {
          if (data.type == 2) {
            that.setData({
              showDialog: false
            })
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
          } else {
            this.changeOrderStatusFn(data.orderId, 10, () => {
              that.setData({
                showDialog: false
              })
            });
          }

        })
    },
    edit(e) {
      let { orderid, ordernumber } = e.currentTarget.dataset;
      this.setData({
        orderNumber: ordernumber,
        orderId: orderid
      })
      this.getOrderKdList(ordernumber, 0)
    },
    getOrderKdList(orderNumber, len) {
      let data = {
        orderNumber: orderNumber
      };
      http.getOrderKdList(data)
        .then(res => {
          let list = res.list
          if (list.length > 0) {
            len = len == 0 ? len : list.length - 1;
            let kdNumber = list[len].kdNumber
            this.setData({
              kdName: (kdNumber.split('$$'))[1],
              kdNumber: (kdNumber.split('$$'))[0],
              kdId: list[len].id
            })
            this.setData({
              showDialog: true
            })
          }
        })
    },
    getcontent(e) {
      let value = e.detail.value;
      this.setData({
        content: value
      })
    },
    hideDialogP() {
      this.setData({
        showDialogP: false
      })
    },
    changeScore(e) {
      let { index } = e.currentTarget.dataset;
      this.setData({
        score: index
      })
    },
    pingjia(e) {
      let { index } = e.currentTarget.dataset;
      let info = (this.data.list)[index];

      this.setData({
        showDialogP: true,
        selectInfo: info
      })
    },
    submiKdP() {
      if (!this.data.content) {
        wx.showToast({
          title: '请输入评价内容',
          icon: 'none'
        })
        return false
      }

      if (this.data.score < 1) {
        wx.showToast({
          title: '评分不能小于一分',
          icon: 'none'
        })
        return false
      }

      let selectInfo = this.data.selectInfo;
      let productList = selectInfo.productList;
      let pojo = [];
      let score = this.data.score;
      let content = this.data.content;
      pojo = productList.map(item => {
        return {
          productId: item.productId,
          level: score,
          content: content,
          orderId: item.orderId
        }
      })
      let that = this;
      console.log(pojo)
      let data = {
        type: 1,
        pojo: JSON.stringify(pojo)
      }
      http.ratedOrder(data)
        .then(res => {
          // wx.showToast({
          //   title: '评价成功',
          // })
          // this.setData({
          //   showDialogP: false
          // })
          // this.getOrderList();
          this.changeOrderStatusFn(selectInfo.id, 10, () => {
            that.setData({
              showDialogP: false
            })
          });
        })
    }
  }
})
