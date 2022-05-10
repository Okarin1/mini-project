// pages/home-phone/index.js
import {
  brandStore,
  brandMap
} from '../../store/index'
import{getRankingList} from "../../service/api_phone"
const brandInfo = [{
  brand: "未知",
  brandName:"none"
}, {
  brand: "华为",
  brandName:"huaweiList",
  cover: "../../assets/images/cover/cover_huawei.jpg"
}, {
  brand: "苹果",
  brandName:"iphoneList",
  cover: "../../assets/images/cover/cover_iphone.jpg"
}, {
  brand: "小米",
  brandName:"xiaomiList",
  cover: "../../assets/images/cover/cover_xiaomi.jpg"
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandList: {
      1: {},
      2: {},
      3: {},
    },
    ranking:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getRankingList().then(res=>{
      this.setData({
       ranking: res.rankinglist
      })
    })
    brandStore.dispatch("getPhoneDataAction")
    brandStore.onState("huaweiList", this.getListHandler(1))
    brandStore.onState("iphoneList", this.getListHandler(2))
    brandStore.onState("xiaomiList", this.getListHandler(3))
  },

  getListHandler: function (idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const phoneList = {
        phoneList: res,
        brand: brandInfo[idx].brand,
        coverImgUrl:brandInfo[idx].cover
      }
      const newLists = {
        ...this.data.brandList,
        [idx]: phoneList
      }
      this.setData({
        brandList: newLists
      })
    }
  },

  handleBrandItemClick(event) {
    const idx = event.currentTarget.dataset.idx
    const brandName = brandMap[idx]
    let title = " "
    brandInfo.findIndex(res=>{
      if(res.brandName == brandName){
       title = res.brand
      }
    })
    this.navigateToDetailPhonesPage(brandName,title)
  },

  navigateToDetailPhonesPage(brandName,title) {
    wx.navigateTo({
      url: `/pages/phone-list/index?brandName=${brandName}&title=${title}`
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