// components/post-item/index.js
import {
  thumbPost
} from "../../service/api_home"
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached: function() {
     let thumbNum = this.properties.item.thumbs
      this.setData({
        thumbNum:thumbNum
      })
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
      this.triggerEvent("userClick")
    },
    handlePostClick:function(){
      this.triggerEvent("postClick")
    },
    handleTypeClick:function(){
      this.triggerEvent("typeClick")
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
