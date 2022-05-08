// components/user-list-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
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
    handleUserClick: function() {
      let username =  this.properties.item.username
      wx.navigateTo({
        url: '/pages/user-info/index?username=' + username
      })
    },
  }
})
