// pages/user-info/index.js
import {
  getUserInfoByUserName,
  getUserPostInfoById
} from "../../service/api_user"
import {
  userStore,
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    username: "",
    userPostList: [],
    isUser: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let username = options.username
    this.setData({
      username: username
    })
    userStore.onState("userInfo", this.isLoginUser())
  },
  onShow(){
    let username = this.data.username
    this.getUserData(username)
  },

  //点击编辑
  editInfoClick() {
    wx.navigateTo({
      url: '/pages/user-edit/index'
    })
  },
  //判断是否是登录用户
  isLoginUser() {
    return (res) => {
      this.setData({
        userInfo: res
      })
      if (res.username == this.data.username) this.setData({
        isUser: true
      })
    }
  },

  //获取用户信息
  getUserData(name) {
    getUserInfoByUserName(name).then(res => {
      this.setData({
        user: res.user[0]
      })
      let id = res.user[0].id
      this.getPostListData(id,1)
    })
  },

  //获取用户帖子
  async getPostListData(id, page) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    let res = await getUserPostInfoById(id, page)
    if(res.posts){
      res.posts.forEach(item=>{
        item.nickname = this.data.user.nickname
        item.headPortrait = this.data.user.headPortrait
        item.username = this.data.user.username
      })
    }
    let newData = this.data.userPostList
    if (newData.length == res.total) {
      wx.hideNavigationBarLoading()
      return
    }
    page === 1 ? (newData = res.posts) : (newData = newData.concat(res.posts))
    this.setData({
      userPostList: newData,
    })
    wx.hideNavigationBarLoading()
    if (page === 1) {
      wx.stopPullDownRefresh()
    }
  },


  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      userPostList: [],
    })
    let id = this.data.user.id
    this.getPostListData(id, 1)
  },

  //上拉加载
  onReachBottom() {
    let id = this.data.user.id
    let page = Math.ceil((this.data.userPostList.length) / 10) + 1
    this.getPostListData(id, page)
  },

})