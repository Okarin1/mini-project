// pages/home-remind/index.js;
import { userStore, noticeStore } from "../../store/index";
import { deleteThumbsNoticeById } from "../../service/api_user";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    commentNoticeList: [],
    thumbsNoticeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.getUserHandler);
    noticeStore.onState("thumbsNoticeList", this.getThumbsNoticeList);
    noticeStore.onState("commentNoticeList", this.getCommentNoticeList);
  },

  getUserHandler(res) {
    this.setData({
      userInfo: res,
    });
  },

  handleLoginClick() {
    wx.navigateTo({
      url: "/pages/login/index",
    });
  },

  getThumbsNoticeList(res) {
    this.setData({
      thumbsNoticeList: res,
    });
  },
  getCommentNoticeList(res) {
    this.setData({
      commentNoticeList: res,
    });
  },

  deleteNotice() {
    let { id, username } = this.data.userInfo;
    if (id && username) {
      deleteThumbsNoticeById(id).then((res) => {
       if(res.msg == "success"){
        noticeStore.dispatch("getNoticeDataAction", id, username);
       }
      });
    }
  },

  onPullDownRefresh() {
    let { id, username } = this.data.userInfo;
    if (id && username) {
      noticeStore.dispatch("getNoticeDataAction", id, username);
    }
  },
});
