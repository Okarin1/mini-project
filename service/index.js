const BASE_URL = "http://101.43.221.86:88"
class MyRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  get(url, params) {
    return this.request(url, "GET", params)
  }
  post(url, data) {
    return this.request(url, "POST", data)
  }
} 
const myRequest = new MyRequest()
export default myRequest
