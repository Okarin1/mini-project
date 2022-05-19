// pages/home-mine/index.js
import { userStore, followStore, noticeStore } from "../../store/index";
import { getUserPostInfoById } from "../../service/api_user";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    postsNum: 0,
    followList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.getUserHandler);
    noticeStore.onState("noticeList", this.setNoticeNum);
    followStore.onState("followList", this.getFollowNum);
  },

  onShow() {
    let { id, username } = this.data.userInfo;
    if (id && username) {
      noticeStore.dispatch("getNoticeDataAction", id, username);
      followStore.dispatch("getFollowDataAction", id);
      this.getMyPostsNum(id, 1);
    }
  },

  getUserHandler(res) {
    this.setData({
      userInfo: res,
    });
  },

  getMyPostsNum(id) {
    getUserPostInfoById(id, 1).then((res) => {
      if (res.posts) {
        this.setData({
          postsNum: res.total,
        });
      } else {
        this.setData({
          postsNum: 0,
        });
      }
    });
  },

  getFollowNum(res) {
    this.setData({
      followList: res,
    });
  },

  setNoticeNum(res) {
    if (res.length != 0) {
      //设置角标
      wx.setTabBarBadge({
        index: 2, //tabBar序号，从0开始计数
        text: res.length.toString(),
      });
    } else {
      wx.removeTabBarBadge({
        index: 2,
      });
    }
  },

  handleLoginClick() {
    wx.navigateTo({
      url: "/pages/login/index",
    });
  },

  showMyPosts() {
    let userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: "/pages/my-post/index?userInfo=" + userInfo,
    });
  },
  showMyFollow() {
    wx.navigateTo({
      url: "/pages/my-follow/index",
    });
  },

  handleUserInfo() {
    let username = this.data.userInfo.username;
    wx.navigateTo({
      url: "/pages/user-info/index?username=" + username,
    });
  },

  removeLoginClick() {
    userStore.setState("userInfo", {});
    this.setData({
      postsNum: 0,
    });
    followStore.setState("followList", []);
    noticeStore.setState("noticeList", []);
    noticeStore.setState("thumbsNoticeList", []);
    noticeStore.setState("commentNoticeList", []);
  },

  onUnload() {
    userStore.offState("userInfo", this.getUserHandler);
  },
});
