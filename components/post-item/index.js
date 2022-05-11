// components/post-item/index.js
import {
  thumbPost,checkThumbsPosts
} from "../../service/api_home"
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached: function() {
     let thumbNum = this.properties.item.thumbs
     let userId = this.properties.userInfo.id 
     let postsId = this.properties.item.postsId
      this.setData({
        thumbNum:thumbNum,
      })
      if(userId){
        checkThumbsPosts(postsId,userId).then((res)=>{
          if(res.msg == "已经点赞"){
            this.setData({
              isThumbed:true
            })
          }else if(res.msg == "没有点赞"){
            this.setData({
              isThumbed:false
            })
          }
        })
      }
    },
  },
  properties: {
    item: {
      type: Object,
      value: {}
    },
    isTypePage:{
      type:Boolean,
      value:false
    },
    userInfo:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isThumbed:false,
    thumbColor:"#007acc",
    thumbNum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleUserClick: function() {
      let username =  this.properties.item.username
      wx.navigateTo({
        url: '/pages/user-info/index?username=' + username
      })
    },

    handlePostClick:function(){
      let postInfo = JSON.stringify(this.properties.item)
      wx.navigateTo({
        url: '/pages/post-detail/index?postInfo=' + postInfo
      })
    },

    handleTypeClick:function(){
      let type = this.properties.item.type
      wx.navigateTo({
        url: '/pages/post-type/index?type=' + type
      })
    },

    handleThumbClick: function() {
      let userId = this.properties.userInfo.id 
      let postsId = this.properties.item.postsId
      let localThumbs = this.data.thumbNum
      if(userId && postsId){
        thumbPost(postsId,userId).then(
          res=>{
            if(res.msg == "点赞成功!"){
              this.setData({
                isThumbed:true
              })
              this.setData({
                thumbNum:localThumbs + 1
              })
            }else{
              this.setData({
                isThumbed:false
              })
              this.setData({
                thumbNum:localThumbs - 1
              })
            }
          }
        )
      }else{
        wx.showToast({
          title: "请先登录再进行操作",
          icon: 'none',
          duration: 2000
        })
      }
      // this.triggerEvent("thumbClick")
    },
  }
})
