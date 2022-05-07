// pages/home-main/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  getBanner,
  getRemmedPost,
  thumbPost
} from "../../service/api_home"
import {
  queryRect,
} from "../../utils/helper"
import {
  userStore,
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommendPostList: [],
    swiperHeight: 0,
    hasMore: true,
    userInfo: {},
    thumbedList: []
  },


  handleSearchClick() {
    console.log("clicked")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()
    this.getPostList(1)
    userStore.onState("userInfo", this.getUserHandler())
  },
  getPageData() {
    getBanner().then(res => {
      this.setData({
        banners: res
      })
    })
  },

  async getPostList(page) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    try {
      const res = await getRemmedPost(page)
      if (this.data.recommendPostList.length == res.total) {
        wx.hideNavigationBarLoading()
        return
      }
      let newData = this.data.recommendPostList
      page === 1 ? (newData = res.list) : (newData = newData.concat(res.list))
      this.setData({
        recommendPostList: newData,
      })
      wx.hideNavigationBarLoading()
      if (page === 1) {
        wx.stopPullDownRefresh()
      }
    } catch (error) {
      console.log(error)
    }
  },

  getUserHandler() {
    return (res) => {
      if (res.id) {
        this.setData({
          userInfo: res
        })
      }
    }
  },



  addPostClick() {
    let userInfo = this.data.userInfo
    if (userInfo.id) {
      let id = userInfo.id
      wx.navigateTo({
        url: '/pages/send-post/index?id=' + id
      })
    } else {
      Dialog.confirm({
          message: '请先登录再进行操作',
        })
        .then(() => {
          wx.navigateTo({
            url: '/pages/login/index',
          })
        })
        .catch(() => {
          // on cancel
        });
    }

  },


  handleSwiperImageLoad() {
    queryRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({
        swiperHeight: rect.height
      })
    })
  },
  handleLoginClick() {
    wx.navigateTo({
      url: '/pages/login/index',
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
    this.setData({
      recommendPostList: [],
    })
    this.getPostList(1)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let page = Math.ceil((this.data.recommendPostList.length) / 10) + 1
    this.getPostList(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})