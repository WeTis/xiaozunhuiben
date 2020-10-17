import { config } from './config.js'
import { api } from './module.js';
const http = new api();


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
}

const formatTimeS = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const isLogin = (status) => {
  let token = wx.getStorageSync("session") || null;
  console.log(token);
  if (token) {
    // 已经授权
    return true;
  } else {
    // 未授权
    if(status) {
      wx.navigateTo({
        url: "/pages/login/login"
      })
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '你还未授权，部分功能不能使用，请前往授权！',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/login/login"
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '很遗憾，你无法使用此功能',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    return false;
  }
}

const login = (fn) => {
  wx.login({
    success: res => {
      let code = res.code;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                wx.request({
                  url: config.api_base_url + '/wxuser/onLogin',
                  data: {
                    code: code,
                    headImage: res.userInfo.avatarUrl,
                    username: res.userInfo.nickName,
                    userType: wx.getStorageSync("userType") || 1
                  },
                  header: {
                    "content-type": 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: (res) => {
                    console.log(res);
                    wx.setStorageSync("session", res.data.token);
                    wx.setStorageSync("userInfo", res.data.user);
                    fn && fn();
                  }
                })

              }
            })
          }
          else {
            // 请打开授权
          }
        }
      })
    }
  })
}

const datedifference = (sDate1, sDate2) => {    //sDate1和sDate2是2006-12-18格式
  var dateSpan,
    tempDate,
    iDays;
  console.log(sDate1, sDate2)
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
};
const addmulMonth = (dtstr, n) => {
  var s = dtstr.split("-");
  var yy = parseInt(s[0]);
  var mm = parseInt(s[1]);
  var dd = parseInt(s[2]);
  var dt = new Date(yy, mm, dd);

  var num = dt.getMonth() + parseInt(n);
  if (num / 12 > 1) {
    yy += Math.floor(num / 12);
    mm = num % 12;
  } else {
    mm += parseInt(n);
  }

  return yy + "-" + mm + "-" + dd;
}   
const formatTimeSMM = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}
const isBuy = (status) => {
  let info = wx.getStorageSync("userInfo") || null;
  if(!info) {
    if (status) {
      wx.showModal({
        title: '提示',
        content: '您还不是会员，请先充值会员！',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/hy/hy"
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '很遗憾，你无法使用此功能',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      return false
    }
    return {
      isInvalid: true,
      isMember: false,
      isuserBalance: false
    }
  }
  let userLabel = info.userLabel;
  let cardImage = info.cardImage;
  let isInvalid = true;   // 是否已经过期
  let isMember = false;   // 是否是会员
  let isuserBalance = false;  // 是否有押金
  // let 
  if (userLabel == '季卡会员' || userLabel == '年卡会员'){
    isMember = true;
    let num = userLabel == '季卡会员' ? 3:12;
    let date = new Date(cardImage)
    let dates = formatTimeSMM(date)
    let nowDate = formatTimeSMM(new Date());
    let endDate = addmulMonth(dates, num)
    let c = datedifference(dates, endDate);
    let cl = datedifference(dates, nowDate);
    if(cl <= c) {
      // 没有过期
      isInvalid = false;
    }else {
      // 已过期
      isInvalid = true;
    }
  } else if (userLabel == '次卡会员') {
    isMember = true;
    if(info.cardCount > 0) {
      // 没有过期
      isInvalid = false;
    } else{ 
      // 已过期
      isInvalid = true;
    }
  } else {
    isMember = false;
  }
  
  // 判断是否退了押金
  if (info.userBalance != 1) {
    // 没有押金
    isuserBalance = false;
  } else {
    // 有押金
    isuserBalance = true;
  }

  // 判断是不是会员
  if(status) {
    if (!isMember) {
      wx.showModal({
        title: '提示',
        content: '您还不是会员，请先充值会员！',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/hy/hy"
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '很遗憾，你无法使用此功能',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      return false;
    }
    if (isMember && isInvalid ) {
      // 是会员但是已经过期
      wx.showModal({
        title: '提示',
        content: '您的会员已过期，请先充值会员！',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/hy/hy"
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '很遗憾，你无法使用此功能',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      return false;
    }
    
    // 是会员但是已经退了押金
    if (isMember && !isuserBalance) {
      wx.showModal({
        title: '提示',
        content: '请先充值押金才可使用此功能',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/hy/hy"
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '很遗憾，你无法使用此功能',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      return false;
    }
    return true;
  } else {
    return {
      isInvalid: isInvalid,
      isMember: isMember,
      isuserBalance: isuserBalance
    }
  }

}

/**
 * 判断订单数量
 */
const orderNumFN = (fn) => {
  let info = wx.getStorageSync("userInfo") || null;
  let msg = {
    complete: 0,
    all: -1
  }
  let data = {
    pageSize: 100000,
    pageNumber: 1,
    userId: info.id,
    orderType: 1
  }
  http.getOrderList(data)
    .then(res => {

      let list = res.pageInfo.list;
      msg.all = list.length;
      list = list.map(item => {
        if (item.orderStatus == 10 || item.orderStatus == 0 || item.orderStatus == 7) {
          msg.complete = msg.complete + 1
        }
        return item
      })
      fn && fn(msg)
  })
}
module.exports = {
  formatTime: formatTime,
  formatTimeS: formatTimeS,
  isLogin: isLogin,
  login: login,
  isBuy: isBuy,
  orderNumFN: orderNumFN
}
