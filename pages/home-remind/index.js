// pages/home-remind/index.js;
import { userStore, noticeStore } from "../../store/index";
import { deleteThumbsNoticeById,deleteCommentNoticeById } from "../../service/api_user";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    commentNoticeList: [],
    thumbsNoticeList: [],
    active: 0,
    thumbsDot: false,
    commentDot: false,
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
    if (res.length != 0) {
      this.setData({
        thumbsDot:true
      });
    }else{
      this.setData({
        thumbsDot:false
      });
    }
  },
  getCommentNoticeList(res) {
    this.setData({
      commentNoticeList: res,
    });
    if (res.length != 0) {
      this.setData({
        commentDot:true
      });
    }else{
      this.setData({
        commentDot:false
      });
    }
  },
  tabChange(event) {
    let index = event.detail.name;
    if (index == 1) {
      let { id, username } = this.data.userInfo;
      if (id && username) {
        deleteThumbsNoticeById(id).then((res) => {
          if (res.msg == "success") {
            noticeStore.dispatch("getNoticeDataAction", id, username);
          }
        });
      }
    }else if(index == 0){
      let { id, username } = this.data.userInfo;
      if (id && username) {
        deleteCommentNoticeById(id).then((res) => {
          if (res.msg == "success") {
            noticeStore.dispatch("getNoticeDataAction", id, username);
          }
        });
      }
    }
  },

  onPullDownRefresh() {
    let { id, username } = this.data.userInfo;
    if (id && username) {
      noticeStore.dispatch("getNoticeDataAction", id, username);
    }
  },
});
