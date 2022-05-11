// components/send-comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object,
      value:{}
    },
    title:{
      type:String,
      value:"写回复"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    message:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPopup() {
      let userId = this.properties.userInfo.id
      if(userId){
        this.setData({ show: true });
      }else{
        wx.showToast({
          title: "请先登录再进行操作",
          icon: 'none',
          duration: 2000
        })
      }
    },
    onClose() {
      this.setData({ show: false });
    },
    sendClick: function() {
      this.triggerEvent("click",{comment:this.data.message})
      this.setData({
        message:""
      })
      this.onClose()
    }
  }
})
