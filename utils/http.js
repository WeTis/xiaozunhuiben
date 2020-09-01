import { config } from './config.js'

class HTTP {
  request(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync("session") || ''
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          wx.hideLoading()
          reject();
        }
      },
      fail: (err) => {
        wx.hideLoading()
        reject();
      }
    })
  }
}

export { HTTP }