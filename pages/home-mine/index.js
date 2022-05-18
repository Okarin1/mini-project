// pages/home-mine/index.js
import { userStore,followStore } from "../../store/index";
import { getUserPostInfoById } from "../../service/api_user";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    postsNum: 0,
    followList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.getUserHandler);
  },

  onShow() {
    let { id } = this.data.userInfo;
    if(id){
      this.getMyPostsNum(id,1)
      followStore.dispatch("getFollowDataAction", id);
      followStore.onState("followList",this.getFollowNum)
    }
  },

  getUserHandler(res) {
    this.setData({
      userInfo: res,
    });
  },

  getMyPostsNum(id) {
    if (id) {
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
    }
  },
  getFollowNum(res) {
    this.setData({
      followList: res,
    });
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
  showMyFollow(){
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
  },

  onUnload() {
    userStore.offState("userInfo", this.getUserHandler);
  },
});
