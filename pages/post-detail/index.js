// pages/post-detail/index.js
import{ getPostByPostId ,getPostThumbsList,getPostCommentList} from"../../service/api_home"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  postInfo:{},
  active: 1,
  thumbsList:[],
  commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.postInfo){
      let postInfo = JSON.parse(options.postInfo)
      this.setData({
        postInfo:postInfo
      })
    }else{
      if(options.postsId){
        getPostByPostId(options.postsId).then(res=>{
          this.setData({
            postInfo:res.posts
          })
        })
      }
    }
    let postsId = this.data.postInfo.postsId
    if(postsId){
      getPostThumbsList(postsId).then(res=>{
        if(res.msg == "success"){
          this.setData({
            thumbsList:res.records
          })
        }
      })
      getPostCommentList(postsId,1).then(res=>{
        if(res.msg == "success"){
          this.setData({
            commentList:res.Commentlist.records
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
  showUserInfo(){
    let username = this.data.postInfo.username
    wx.navigateTo({
      url: '/pages/user-info/index?username=' + username
    })
  },
  showTypePost(){
    let type = this.data.postInfo.type
    wx.navigateTo({
      url: '/pages/post-type/index?type=' + type
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