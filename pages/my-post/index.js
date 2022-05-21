// pages/my-post/index.js
import { getUserPostInfoById, deletePostByPostId } from "../../service/api_user";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    myPostList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = JSON.parse(options.userInfo);
    this.setData({
      userInfo: userInfo,
    });
    let id = this.data.userInfo.id;
    this.getPostListData(id, 1);
  },
  //获取用户帖子

  async getPostListData(id, page) {
    wx.showNavigationBarLoading();
    let res = await getUserPostInfoById(id, page);
    if (res.posts) {
      res.posts.forEach((item) => {
        item.nickname = this.data.userInfo.nickname;
        item.headPortrait = this.data.userInfo.headPortrait;
        item.username = this.data.userInfo.username;
      });
    
    let newData = this.data.myPostList;
    if (newData.length == res.total && page != 1) {
      wx.hideNavigationBarLoading();
      return;
    }
    if (page === 1) {
      newData = res.posts;
    } else {
      newData = newData.concat(res.posts);
    }

    //设置数据
    this.setData({
      myPostList: newData,
    });
    wx.hideNavigationBarLoading();
    if (page === 1) {
      wx.stopPullDownRefresh();
    }
  }
  },

  deletePost(event) {
    const {postid} = event.currentTarget.dataset;
    wx.showModal({
      title: "提示",
      content: "确定删除该帖子？",
      success: (res) => {
        if (res.confirm) {
          deletePostByPostId(postid).then((res) => {
            let id = this.data.userInfo.id;
            this.getPostListData(id, 1);
          });
        }
      },
    });
  },

  //下拉刷新
  onPullDownRefresh() {
    let id = this.data.userInfo.id;
    this.getPostListData(id, 1);
  },

  //上拉加载
  onReachBottom() {
    let id = this.data.userInfo.id;
    let page = Math.ceil(this.data.myPostList.length / 10) + 1;
    this.getPostListData(id, page);
  },
});
