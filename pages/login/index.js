// pages/login/index.js
import { userStore } from "../../store/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  loginClick() {
    const { username, password } = this.data;
    if (username && password) {
      userStore.dispatch("getUserDataAction", username, password);
    } else {
      wx.showToast({
        title: "请输入用户名和密码",
        icon: "none",
        duration: 2000,
      });
    }
    userStore.onState("userInfo", this.getLoginHandler);
  },
  registerClick() {
    wx.navigateTo({
      url: "/pages/register/index",
    });
  },

  getLoginHandler(res) {
    if (res.id) {
      setTimeout(() => {
        wx.switchTab({
          url: "/pages/home-mine/index",
        });
      }, 500);
    }
  },

  onUnload() {
    userStore.offState("userInfo", this.getLoginHandler);
  },
});
