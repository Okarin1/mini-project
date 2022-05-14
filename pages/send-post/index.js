// pages/send-post/index.js
import{sendPostById} from "../../service/api_home"
import {
  uploadImage
} from "../../service/api_upload"

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
    fileList:[],
    value: 1,
    article:"",
    type:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({id:options.id} )
  },
  tagChange(value){
    this.setData({
      type:value.detail
    })
  },
  postClick(){
    wx.showLoading({})
    const { fileList = [] } = this.data;
    Promise.all(fileList.map(item=>{
      return new Promise((resolve, reject)=>{
          uploadImage(item.url).then(res=>{
          resolve(JSON.parse(res).fileName)
        })
      })
    })).then(res=>{
      if(res[0]){
        let article = this.data.article
        let image = JSON.stringify(res)
        let { type } = this.data
        let { id } = this.data
        if(id){
          sendPostById(id,type,article,image).then(
            (res)=>{
                wx.hideLoading()
                if(res && res.msg == "success"){
                  wx.switchTab({
                    url: '/pages/home-main/index',
                  })}
                  wx.showToast({
                    title: '发布成功',
                    icon: "none"
                  })
            }
          )
        }
      }else{
        wx.showToast({
          title: '请检查选择的图片',
          icon: "none"
        })
      }
      
    })
   
  


  },

  cacheImage(event) {
    const { file } = event.detail;
    const { fileList = [] } = this.data;
    fileList.push({ ...file});
    this.setData({ fileList });
  },
  deleteImage(event){
    const { index } = event.detail;
    const { fileList = [] } = this.data;
    fileList.splice(index,1)
    this.setData({ fileList });
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