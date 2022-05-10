// pages/user-info/index.js
import {
  getUserInfoByUserName,getUserPostInfoById
} from "../../service/api_user"
import {
  userStore,
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    username:null,
    userPostList: null,
    isUser:false,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let username = options.username
    this.setData({
      username:username
    })
    userStore.onState("userInfo", this.isLoginUser())
    this.getUserData(username)
  },
  editInfoClick(){
    wx.navigateTo({
      url: '/pages/user-edit/index'
    })
  },

  isLoginUser(){
    return (res)=>{
      if(res.id){
        this.setData({
          userInfo:res
        })
        if(res.username == this.data.username)
        this.setData({
          isUser: true
        })
      }
      }
    },
    
    
  getUserData(name) {
    getUserInfoByUserName(name).then(res => {
        this.setData({
          user: res.user[0]
        })
        let id = this.data.user.id
        getUserPostInfoById(id).then(res=>{
          if(res.posts){
            res.posts.forEach(item=>{
              item.nickname = this.data.user.nickname
              item.headPortrait = this.data.user.headPortrait
              item.username = this.data.user.username
            })
            let postsList = res.posts.reverse()
            this.setData({
              userPostList: postsList
            })
          }
        })
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
  userStore.offState("userInfo", this.isLoginUser())
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