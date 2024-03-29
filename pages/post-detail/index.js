// pages/post-detail/index.js
import {
  getPostByPostId,
  getPostThumbsList,
  getPostCommentList,
  sendPostComment
} from "../../service/api_home"

import {
  userStore,
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postInfo: {},
    active: 1,
    thumbsList: [],
    commentList: [],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.postInfo) {
      let postInfo = JSON.parse(options.postInfo)
      this.setData({
        postInfo: postInfo
      })
      this.getPostDetail(postInfo.postsId)
    }
    if (options.postsId) {
      getPostByPostId(options.postsId).then(res => {
        let postInfo = res.posts
        postInfo.username = res.user[0].username
        postInfo.nickname = res.user[0].nickname
        postInfo.headPortrait = res.user[0].headPortrait
        this.setData({
          postInfo: postInfo
        })
        this.getPostDetail(options.postsId)
      })
    }
    userStore.onState("userInfo", this.getUserHandler)

  },

  getPostDetail(postsId) {
    if (postsId) {
      getPostThumbsList(postsId).then(res => {
        if (res.msg == "success") {
          this.setData({
            thumbsList: res.records
          })
        }
      })
      getPostCommentList(postsId, 1).then(res => {
        if (res.msg == "success") {
          this.setData({
            commentList: res.Commentlist.records
          })
        }
      })
    }
  },

  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
  getUserHandler(res) {
    this.setData({
      userInfo: res
    })
  },

  showUserInfo() {
    let username = this.data.postInfo.username
    wx.navigateTo({
      url: '/pages/user-info/index?username=' + username
    })
  },

  showTypePost() {
    let type = this.data.postInfo.type
    wx.navigateTo({
      url: '/pages/post-type/index?type=' + type
    })
  },
  sendComment(event) {
    wx.showLoading({
      title: '正在发布',
    })
    let comment = event.detail.comment
    let userId = this.data.userInfo.id
    let postsId = this.data.postInfo.postsId
    if (comment && userId && postsId) {
      sendPostComment(postsId, userId, comment).then(res => {
        wx.hideLoading({
          success: (res) => {},
        })
        if (res.msg == "success") {
          this.getPostDetail(postsId)
        }
      })
    }
  },

  onUnload() {
    userStore.offState("userInfo", this.getUserHandler)
  },
})