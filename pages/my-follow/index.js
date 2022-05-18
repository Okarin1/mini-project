// pages/my-follow/index.js
import { followStore } from "../../store/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    followStore.onState("followList", this.getFollowList);
  },

  getFollowList(res) {
    this.setData({
      phoneList: res,
    });
  },

  showPhoneDetail(event) {
    let { info } = event.target.dataset;
    let { id, spuName } = info;
    wx.navigateTo({
      url: `/pages/phone-detail/index?id=${id}&spuName=${spuName}`,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
