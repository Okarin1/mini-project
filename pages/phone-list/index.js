// pages/phone-list/index.js
import {
  brandStore,
} from '../../store/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand: "",
    title:"",
    phoneList: []
  },

  onLoad(options) {
    const title = options.title
    const brand = options.brandName
    this.setData({
      brand: brand,
      title: title
    })
    brandStore.onState(this.data.brand, this.getPhoneDataHandler)
  },

  getPhoneDataHandler(res) {
    this.setData({
      phoneList: res
    })
  },
  showPhoneDetail(event){
    let spuId = event.target.dataset.id
    wx.navigateTo({
      url: '/pages/phone-detail/index?spuId=' + spuId,
    })
  },

  onUnload() {
    brandStore.offState(this.data.brand, this.getPhoneDataHandler)
  },
})