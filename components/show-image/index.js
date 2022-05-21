// components/show-image/index.js
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached: function() {
      let image = this.properties.image
     let imageList = JSON.parse(image)
     if(imageList[0]){
      this.setData({
        mediaList:imageList
      })
     }
    }
  },
    
  properties: {
    image:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mediaList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 图片加载后判断图片宽高比例
    oneImageLoad(e) {
      const { width , height } = e.detail
      height >= width && this.setData({ isHeightMode: true })
    },
    handleImageClick(event){
      const {src} = event.currentTarget.dataset
      let imgList = this.data.mediaList.map(res=>{
        return  "http://101.43.221.86:8081/upload/" + res;
      })
      //图片预览
      wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
      })
    }
  }
})
