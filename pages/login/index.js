// pages/login/index.js
import {
  userStore,
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  loginClick() {
    const username = this.data.username
    const password = this.data.password
    if (username && password) {
      userStore.dispatch("getUserDataAction", username, password)
    } else {
      wx.showToast({
        title: "请输入用户名和密码",
        icon: 'none',
        duration: 2000
      })
    }
    userStore.onState("userInfo", this.getLoginHandler)
  },

  getLoginHandler(res) {
    if (res.id) {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/home-mine/index',
        })
      }, 500)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    userStore.offState("userInfo", this.getLoginHandler)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})