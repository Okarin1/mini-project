// components/follow-area/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    followList: {
      type: Array,
      value: []
    },
    title:{
      type:String,
      value:"默认歌单"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPhoneDetail(event) {
      let { info } = event.target.dataset;
      let { id, spuName } = info;
      wx.navigateTo({
        url: `/pages/phone-detail/index?id=${id}&spuName=${spuName}`,
      });
    },
  }
})
