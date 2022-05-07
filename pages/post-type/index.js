// pages/post-type/index.js
import {
  getPostByType
} from "../../service/api_home"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    hasMore: true,
    isTypePage:true,
    total:0,
    type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let type = options.type
    this.setData({
      type:type
    })
    this.getPostList(1,type)
  },
  showUserInfo(event){
    let username = event.target.dataset.postinfo.username
    wx.navigateTo({
      url: '/pages/user-info/index?username=' + username
    })
  },


  async getPostList(page,type) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    try{
      const res = await getPostByType(page,type)
      this.setData({
        total:res.total
      })
      if (this.data.postList.length == res.total) {
        wx.hideNavigationBarLoading()
        return
      }
      let newData = this.data.postList
      page === 1 ? (newData = res.list) : (newData = newData.concat(res.list))
      this.setData({
        postList: newData,
      })
      wx.hideNavigationBarLoading()
      if (page === 1) {
        wx.stopPullDownRefresh()
      }
    }catch(error){
      console.log(error)
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      postList: [],
    })
    this.getPostList(1,this.data.type)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let page = Math.ceil((this.data.postList.length) / 10) + 1
    this.getPostList(page,this.data.type)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})