// pages/user-info/index.js
import { getUserInfoByUserName, getUserPostInfoById, getFollowInfoById } from "../../service/api_user";
import { userStore } from "../../store/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    username: "",
    userPostList: [],
    followList: [],
    isUser: false,
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { username } = options;
    this.setData({
      username,
    });
    userStore.onState("userInfo", this.isLoginUser);
  },
  onShow() {
    let { username, id } = this.data;
    this.getUserData(username);
  },

  //点击编辑
  editInfoClick() {
    wx.navigateTo({
      url: "/pages/user-edit/index",
    });
  },
  //判断是否是登录用户
  isLoginUser(res) {
    this.setData({
      userInfo: res,
    });
    if (res.username == this.data.username)
      this.setData({
        isUser: true,
      });
  },

  //获取用户信息
  getUserData(name) {
    getUserInfoByUserName(name).then((res) => {
      this.setData({
        user: res.user[0],
      });
      let id = res.user[0].id;
      this.getPostListData(id, 1);
      this.getUserFollow(id)
    });
  },

  //获取用户关注数码
  getUserFollow(id) {
    getFollowInfoById(id).then((res) => {
      if (res.spuInfo) {
        this.setData({
          followList: res.spuInfo,
        });
      } else {
        this.setData({
          followList: [],
        });
      }
    });
  },

  //获取用户帖子
  async getPostListData(id, page) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    });
    let res = await getUserPostInfoById(id, page);
    if (res.posts) {
      res.posts.forEach((item) => {
        let { nickname, headPortrait, username } = this.data.user;
        let temp = { nickname, headPortrait, username };
        Object.assign(item, temp);
      });
      let newData = this.data.userPostList;
      if (newData.length == res.total) {
        wx.hideNavigationBarLoading();
        return;
      }
      if (page === 1) {
        newData = res.posts;
      } else {
        newData = newData.concat(res.posts);
      }
      this.setData({
        userPostList: newData,
      });
      wx.hideNavigationBarLoading();
      if (page === 1) {
        wx.stopPullDownRefresh();
      }
    } else {
      wx.hideNavigationBarLoading();
      this.setData({ userPostList: [] });
    }
  },

  //点击头像
  handleImageClick(event){
    const {image} = event.currentTarget.dataset//获取data-src
    wx.previewImage({
      current: image, // 当前显示图片的http链接
      urls: [image] // 需要预览的图片http链接列表
      })
    },

  //上拉加载
  onReachBottom() {
    let id = this.data.user.id;
    let page = Math.ceil(this.data.userPostList.length / 10) + 1;
    this.getPostListData(id, page);
  },


  //注销监听
  onUnLoad() {
    userStore.offState("userInfo", this.isLoginUser);
  },
});
