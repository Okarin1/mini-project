// pages/home-remind/index.js
import {
  userStore,
} from '../../store/index'
import {
  getNoticeById,
  deleteNoticeById
} from "../../service/api_user"
import {
  sortItemByDate
} from "../../utils/helper"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    commentNoticeList: [],
    thumbsNoticeList: [],
    noticeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.getUserHandler())
  },
  getUserHandler() {
    return (res) => {
      if (res) {
        this.setData({
          userInfo: res
        })
        if (this.data.userInfo.id) {
          this.getNoticeList(res.id)
        }

        // if (this.data.userInfo.id) {
        //   setInterval(() => {
        //     let pages = getCurrentPages()
        //     if ((pages[0].route !== "pages/home-remind/index")&&(this.data.userInfo.id) ) {
        //       this.getNoticeList(res.id)
        //     }
        //   }, 5000)
        // }
      }
    }
  },

  getNoticeList(id) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    getNoticeById(id).then((res) => {
      this.setData({
        commentNoticeList: res.postsCommentNotice,
        thumbsNoticeList: res.thumbsNotice
      })
      let noticeList = res.postsCommentNotice.concat(res.thumbsNotice)
      sortItemByDate(noticeList)
      noticeList = noticeList.filter(res => {
        return res.username != this.data.userInfo.username
      });
      this.setData({
        noticeList: noticeList
      })
      if (noticeList.length != 0) {
        //设置角标
        wx.setTabBarBadge({
          index: 2, //tabBar序号，从0开始计数
          text: noticeList.length.toString()
        })
      }
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },

  deleteNoticeList(id) {
    if (this.data.noticeList.length != 0) {
      deleteNoticeById(id).then(res => {
        if (res.msg == "success") {
          this.setData({
            noticeList: [],
          })
        }
      })
    }
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
    let id = this.data.userInfo.id
    if (id) {
      this.deleteNoticeList(id)
    }
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
    this.getNoticeList(this.data.userInfo.id)
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