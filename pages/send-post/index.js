// pages/send-post/index.js
import { sendPostById } from "../../service/api_home";
import { uploadImage } from "../../service/api_upload";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    option: [
      { text: "综合讨论", value: 1 },
      { text: "玩机技巧", value: 2 },
      { text: "好物安利", value: 3 },
      { text: "开箱评测", value: 4 },
      { text: "酷玩夜话", value: 5 },
    ],
    fileList: [],
    value: 1,
    article: "",
    type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
    });
  },

  tagChange(value) {
    this.setData({
      type: value.detail,
    });
  },

  async postClick() {
    wx.showLoading({});
    let { type, id, article, fileList, image } = this.data;
    if (fileList.length != 0) {
      const res = await this.getPostImgUrl(fileList);
      res[0] && (image = JSON.stringify(res));
    }
    this.postSend(id, type, article, image);
  },

  postSend(id, type, article, image) {
    sendPostById(id, type, article, image).then((res) => {
      wx.hideLoading();
      if (res && res.msg == "success") {
        wx.switchTab({
          url: "/pages/home-main/index",
        });
      }
      wx.showToast({
        title: "发布成功",
        icon: "none",
      });
    });
  },

  getPostImgUrl(fileList) {
    return Promise.all(
      fileList.map((item) => {
        return new Promise((resolve, reject) => {
          uploadImage(item.url).then((res) => {
            if ((JSON.parse(res).msg = "success")) {
              resolve(JSON.parse(res).fileName);
            } else {
              wx.hideLoading();
              wx.showToast({
                title: "请检查图片",
                icon: "none",
              });
            }
          });
        });
      })
    );
  },

  cacheImage(event) {
    const { file } = event.detail;
    const { fileList = [] } = this.data;
    fileList.push({
      ...file,
    });
    this.setData({
      fileList,
    });
  },

  deleteImage(event) {
    const { index } = event.detail;
    const { fileList = [] } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },
});
