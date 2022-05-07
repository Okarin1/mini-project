// pages/send-post/index.js
import{sendPostById} from "../../service/api_home"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: [
      { text: '综合讨论', value: 1 },
      { text: '玩机技巧', value: 2 },
      { text: '好物安利', value: 3 },
      { text: '开箱评测', value: 4 },
      { text: '酷玩夜话', value: 5 }
    ],
    value: 1,
    message:"",
    type:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({id:options.id})
  },
  tagChange(value){
    this.setData({
      type:value.detail
    })
  },
  postClick(){
    wx.showLoading({
    })
    let article = this.data.message
    let type = this.data.type
    let id = this.data.id
    if(id){
      sendPostById(id,type,article).then(
        (res)=>{
            wx.hideLoading()
            if(res && res.msg == "success"){
              wx.switchTab({
                url: '/pages/home-main/index',
              })}
        }
      )
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