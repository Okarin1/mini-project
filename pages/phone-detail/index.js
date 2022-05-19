// pages/phone-detail/index.js
import {
  getPhoneParamById,
  getPhoneInfoById,
  getPhoneCommentList,
  sendPhoneComment,
  checkUserFollow,
  followPhone,
} from "../../service/api_phone";

import { userStore,followStore } from "../../store/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo: {},
    phoneParam: {},
    commentList: [],
    userInfo: {},
    decript:"",
    spuId: 0,
    active: 1,
    commentNum: 0,
    isFollow: false,
    followText: "关注",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { id, spuName } = options;
    let phoneInfo = { id, spuName };
    this.setData({
      phoneInfo,
      spuId: phoneInfo.id,
    });
    let spuId = this.data.spuId;
    this.getPhoneData(spuId);
    this.getCommentData(spuId, 1);
    userStore.onState("userInfo", this.getUserHandler);
  },

  // 获取手机的信息和参数
  getPhoneData(id) {
    Promise.all([getPhoneInfoById(id), getPhoneParamById(id)]).then(res=>{
      this.setData({
        decript:res[0].spuInfoDesc.decript,
        phoneParam:res[1].skuAttrAndGroup
      })
    })
  },


  followClick() {
    let { Flag, spuId } = this.data;
    let userId = this.data.userInfo.id;
    if(userId){
      if (!Flag) {
        followPhone(spuId, userId).then((res) => {
          if (res.msg == "关注成功") {
            this.setData({
              isFollow: true,
              followText: "已关注",
            });
          }else if (res.msg == "取消关注成功") {
            this.setData({
              isFollow: false,
              followText: "关注",
            });
          }
          followStore.dispatch("getFollowDataAction", userId);
        });
      } 
    }else{
      wx.showToast({
        title: "请先登录再进行操作",
        icon: "none",
        duration: 2000,
      });
    }
   
  },

  //获取评论数据
  async getCommentData(id, page) {
    wx.showNavigationBarLoading();
    let res = await getPhoneCommentList(id, page);
    this.setData({
      commentNum: res.Commentlist.total,
    });
    let newData = this.data.commentList;
    if (newData.length == res.Commentlist.total && page != 1) {
      wx.hideNavigationBarLoading();
      return;
    }
    page === 1 ? (newData = res.Commentlist.records) : (newData = newData.concat(res.Commentlist.records));
    this.setData({
      commentList: newData,
    });
    wx.hideNavigationBarLoading();
    if (page === 1) {
      wx.stopPullDownRefresh();
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    let spuId = this.data.spuId;
    this.getCommentData(spuId, 1);
  },

  //上拉加载
  onReachBottom() {
    let spuId = this.data.spuId;
    let page = Math.ceil(this.data.commentList.length / 5) + 1;
    this.getCommentData(spuId, page);
  },

  //获取登录用户信息
  getUserHandler(res) {
    this.setData({
      userInfo: res,
    });
    if(res.id){
      let spuId = this.data.spuId;
      checkUserFollow(spuId, res.id).then((res) => {
        if (res.msg == "已经关注") {
          this.setData({
            isFollow: true,
            followText: "已关注",
          });
        } else if(res.msg == "没有关注") {
          this.setData({
            isFollow: false,
            followText: "关注",
          });
        }
      });
    }
  },

  //发表评论
  sendComment(event) {
    wx.showLoading({
      title: "正在发布",
    });
    let comment = event.detail.comment;
    let userId = this.data.userInfo.id;
    let phoneId = this.data.spuId;
    if (comment && userId && phoneId) {
      sendPhoneComment(phoneId, userId, comment).then((res) => {
        wx.hideLoading({
          success: (res) => {},
        });
        if (res.msg == "success") {
          this.getCommentData(phoneId, 1);
        }
      });
    } else {
      wx.showToast({
        title: "参数缺失",
        icon: "none",
        duration: 2000,
      });
    }
  },

  //页面卸载注销监听
  onUnload() {
    userStore.offState("userInfo", this.getUserHandler);
  },
});
