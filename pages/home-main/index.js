// pages/home-main/index.js
import { getBanner, getRemmedPost } from "../../service/api_home";
import { queryRect } from "../../utils/helper";
import { userStore } from "../../store/index";
Page({
  data: {
    banners: {},
    recommendPostList: [],
    swiperHeight: 0,
    hasMore: true,
    userInfo: {},
    thumbedList: [],
    fileList: [],
  },

  onLoad(options) {
    this.getPageData();
    userStore.onState("userInfo", this.getUserHandler);
  },
  onShow() {
    this.getPostList(1);
  },
  getPageData() {
    getBanner().then((res) => {
      this.setData({
        banners: res,
      });
    });
  },

  async getPostList(page) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    });
    try {
      const res = await getRemmedPost(page);
      let newData = this.data.recommendPostList;
      if (newData) {
        if (newData.length == res.total && page != 1) {
          wx.hideNavigationBarLoading();
          return;
        }
        if (page === 1) {
          newData = res.list;
        } else {
          newData = newData.concat(res.list);
        }
        this.setData({
          recommendPostList: newData,
        });
        wx.hideNavigationBarLoading();
        if (page === 1) {
          wx.stopPullDownRefresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  //banner点击
  bannerClick(event){
    let {id} = event.currentTarget.dataset
    if(id.postsId){
      let {postsId} = id
      wx.navigateTo({
        url: '/pages/post-detail/index?postsId=' + postsId
      })
    }else if(id.phoneId){
      let { phoneId, spuName } = id;
      wx.navigateTo({
        url: `/pages/phone-detail/index?id=${phoneId}&spuName=${spuName}`,
      });
    }
  },
  getUserHandler(res) {
    this.setData({
      userInfo: res,
    });
  },

  addPostClick() {
    let userInfo = this.data.userInfo;
    if (userInfo.id) {
      let id = userInfo.id;
      wx.navigateTo({
        url: "/pages/send-post/index?id=" + id,
      });
    } else {
        wx.showModal({
          content: "请先登录再进行操作",
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/login/index",
              });
            }
          },
        });
    }
  },

  handleSwiperImageLoad() {
    queryRect(".swiper-image").then((res) => {
      const rect = res[0];
      this.setData({
        swiperHeight: rect.height,
      });
    });
  },
  handleLoginClick() {
    wx.navigateTo({
      url: "/pages/login/index",
    });
  },
  handleRegisterClick() {
    wx.navigateTo({
      url: "/pages/register/index",
    });
  },

  handleSearchClick() {
    wx.navigateTo({
      url: "/pages/search-detail/index",
    });
  },

  onUnload() {
    userStore.offState("userInfo", this.getUserHandler);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      recommendPostList: []
    })
    this.getPostList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let page = Math.ceil(this.data.recommendPostList.length / 10) + 1;
    this.getPostList(page);
  },
});
