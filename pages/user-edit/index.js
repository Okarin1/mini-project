// pages/user-edit/index.js
import { updateUserInfoById } from "../../service/api_user";
import { uploadImage } from "../../service/api_upload";
import { userStore } from "../../store/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nickname: "",
    autograph: "",
    date: new Date().getTime(),
    minDate: new Date(1900, 0, 1).getTime(),
    fileList: [],
    showNameEdit: false,
    showAutographEdit: false,
    showHeadEdit: false,
    showGenderEdit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userStore.onState("userInfo", this.handleUserInfo);
  },

  handleUserInfo(res) {
    this.setData({
      userInfo: res,
      nickname: res.nickname,
      autograph: res.autograph,
    });
  },

  //显示昵称编辑
  showNameEdit() {
    this.setData({
      showNameEdit: true,
    });
  },

  //关闭昵称编辑
  closeNameEdit() {
    this.setData({
      showNameEdit: false,
    });
  },

  //编辑昵称
  async editNameClick() {
    let id = this.data.userInfo.id;
    let nickname = this.data.nickname;
    const res = await updateUserInfoById({
      id,
      nickname,
    });
    if (res.msg == "success") {
      wx.showToast({
        title: "更新成功",
        icon: "none",
      });
      this.closeNameEdit();
      this.updateInfo();
    }
  },

  //显示签名编辑
  showAutographEdit() {
    this.setData({
      showAutographEdit: true,
    });
  },

  //关闭签名编辑
  closeAutographEdit() {
    this.setData({
      showAutographEdit: false,
    });
  },

  //编辑签名
  async autographEditClick() {
    let id = this.data.userInfo.id;
    let autograph = this.data.autograph;
    const res = await updateUserInfoById({
      id,
      autograph,
    });
    if (res.msg == "success") {
      wx.showToast({
        title: "更新成功",
        icon: "none",
      });
      this.closeAutographEdit();
      this.updateInfo();
    }
  },

  //更新资料
  updateInfo() {
    let { username, password } = this.data.userInfo;
    userStore.dispatch("getUserDataAction", username, password);
  },

  //显示头像编辑
  showHeadEdit() {
    this.setData({
      showHeadEdit: true,
    });
  },

  //关闭头像编辑
  closeHeadEdit() {
    this.setData({
      showHeadEdit: false,
    });
  },

  //更换头像
  updataHead(event) {
    const { file } = event.detail;
    uploadImage(file.url).then((res) => {
      let id = this.data.userInfo.id;
      let headPortrait = JSON.parse(res).fileurl;
      if (headPortrait) {
        updateUserInfoById({
          id,
          headPortrait,
        }).then((res) => {
          if (res.msg == "success") {
            wx.showToast({
              title: "更新成功",
              icon: "none",
            });
            this.closeHeadEdit();
            this.updateInfo();
          }
        });
      }
    });
  },

  //显示性别编辑
  showGenderEdit() {
    this.setData({
      showGenderEdit: true,
    });
  },

  //关闭性别编辑
  closeGenderEdit() {
    this.setData({
      showGenderEdit: false,
    });
  },
  //性别编辑
  async genderClick(event){
    const { gender } = event.currentTarget.dataset;
    let id = this.data.userInfo.id;
    const res = await updateUserInfoById({
      id,
      gender,
    });
    if (res.msg == "success") {
      wx.showToast({
        title: "更新成功",
        icon: "none",
      });
      this.closeGenderEdit();
      this.updateInfo();
    }
  },

  //显示生日编辑
  showDateEdit() {
    this.setData({
      showDateEdit: true,
    });
  },

  //关闭生日编辑
  closeDateEdit() {
    this.setData({
      showDateEdit: false,
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  },

  async dateClick(event) {
    let birthday =  this.formatDate(event.detail);
    let id = this.data.userInfo.id;
    const res = await updateUserInfoById({
      id,
      birthday,
    });
    if (res.msg == "success") {
      wx.showToast({
        title: "更新成功",
        icon: "none",
      });
      this.closeDateEdit();
      this.updateInfo();
    }
  },

  onUnload() {
    userStore.offState("userInfo", this.handleUserInfo);
  },
});
