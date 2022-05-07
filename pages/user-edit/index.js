// pages/user-edit/index.js
import {
  updateUserInfoById
} from "../../service/api_user"
import {
  userStore,
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    nickname: "",
    autograph: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.handleUserInfo())
  },

  handleUserInfo(){
    return(res)=>{
      this.setData({
        userInfo:res,
        nickname:res.nickname,
        autograph:res.autograph
      })
    }
  },
  saveClick() {
      updateUserInfoById({
        id: this.data.userInfo.id,
        autograph: this.data.autograph,
        nickname:this.data.nickname
      }).then(
        (res)=>{
          if(res.msg == "success"){
            wx.showToast({
              title: '更新成功',
            })
          }
          setTimeout(()=>{
            let username = this.data.userInfo.username
            let password = this.data.userInfo.password
            userStore.dispatch("getUserDataAction", username, password)
            wx.switchTab({
              url: '/pages/home-mine/index',
            })
          },1000)
        }
      )
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