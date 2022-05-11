// components/show-image/index.js
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached: function() {
      let image = this.properties.image
     let imageList = JSON.parse(image)
      this.setData({
        mediaList:imageList
      })
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
    }
  }
})
