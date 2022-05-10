// pages/home-mine/index.js
import {
  userStore,
} from '../../store/index'

import {
  getUserPostInfoById
} from "../../service/api_user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    postList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.getUserHandler())
  },

  getUserHandler() {
    return (res) => {
      if (res.id) {
        this.setData({
          userInfo: res
        })
        this.getMyPostList(res.id)
      } else {
        this.setData({
          userInfo: {}
        })
      }
    }
  },

  getMyPostList(id) {
    getUserPostInfoById(id).then(res => {
      if (res.posts) {
        res.posts.forEach(item => {
          item.nickname = this.data.userInfo.nickname
          item.headPortrait = this.data.userInfo.headPortrait
          item.username = this.data.userInfo.username
        })
        this.setData({
          postList: res.posts
        })
      }
    })
  },

  handleLoginClick() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  showMyPosts() {
    let postList = JSON.stringify(this.data.postList)
    wx.navigateTo({
      url: '/pages/my-post/index?postList=' + postList,
    })
  },
  removeLoginClick() {
    userStore.setState("userInfo", {})
    userStore.offState("userInfo", this.getUserHandler())
  },
  handleUserInfo() {
    let username = this.data.userInfo.username
    wx.navigateTo({
      url: '/pages/user-info/index?username=' + username
    })
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