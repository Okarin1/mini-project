// pages/search-detail/index.js
import{getRankingList, searchPhone} from "../../service/api_phone"
import debounce from '../../utils/debouce'
const debounceGetSearchSuggest = debounce(searchPhone, 300)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:[],
    suggestPhone:[],
    resultPhone:[],
    searchValue:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()
  },
  
  //获取热门数据
  getPageData(){
    getRankingList().then(res=>{
      this.setData({
       ranking: res.rankinglist.slice(0, 7)
      })
    })
  },

   // 事件处理
   handleSearchChange: function(event) {
    // 1.获取输入的关键字
    const searchValue = event.detail
    // 2.保存关键字
    this.setData({ searchValue })
    // 3.判断关键字为空字符的处理逻辑
    if (!searchValue.length) {
      this.setData({ suggestPhone: [], resultPhone: [] })
      debounceGetSearchSuggest.cancel()
      return
    }
    debounceGetSearchSuggest(searchValue).then(
      (res)=>{
        this.setData({
          suggestPhone:res.phoneLists
        })
    })
   },

   handleSearchAction: function() {
    const searchValue = this.data.searchValue
    searchPhone(searchValue).then(res => {
      this.setData({ resultPhone: res.phoneLists })
    })
  },
  showPhoneDetail(event) {
    let { info } = event.target.dataset;
    let { id, spuName,spuId } = info;
    wx.navigateTo({
      url: `/pages/phone-detail/index?id=${id||spuId}&spuName=${spuName}`,
    });
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