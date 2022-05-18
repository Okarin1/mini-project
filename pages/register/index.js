// pages/user-register/index.js
import{getSendEmailCode,registerUser}from "../../service/api_user"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    repassword: "",
    email: "",
    code: "",
    correctCode:"",
    buttonFlag:false,
    errorUsername: "",
    errorPassword:"",
    errorRepassword: "",
    errorEmail:"",
    errorCode:"",
    buttonText:"发送验证码"
  },

  checkUsername() {
    const { username } = this.data;
    const _USERNAME = /^([a-zA-Z0-9]{2,6})$/;
    let errorUsername = _USERNAME.test(username) ? "" : "用户名格式错误";
    this.setData({ errorUsername });
  },

  checkPassword() {
    const { password } = this.data;
    const _PASSWORD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/;
    let errorPassword = _PASSWORD.test(password) ? "" : "密码格式错误";
    this.setData({ errorPassword });
  },

  checkRepassword() {
    const { password, repassword } = this.data;
    let errorRepassword = (password == repassword) ? "" : "两次输入的密码不一致";
    this.setData({ errorRepassword });
  },
  checkEmail() {
    const { email } = this.data;
    const _Email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let errorEmail = _Email.test(email) ? "" : "邮箱格式错误";
    this.setData({ errorEmail});
  },
  sendCode(){
    let outTime = 60
    let timer = null
    this.setData({buttonFlag:true})
    if(!timer){
      let timer = setInterval(()=>{
        this.setData({buttonText:`重新发送(${outTime})`})
        outTime = outTime - 1
        if (outTime < 0) {
          clearInterval(timer)
          this.setData({buttonText:"发送验证码",buttonFlag:false})
          outTime = 60
          timer = false
        }
      },1000)
    }
    let {email}  = this.data
    getSendEmailCode(email).then(res=>{
      if(res.msg = "success"){
        this.setData({correctCode:res.emailcode + ''})
      }
    })
  },
  registerClick() {
    
    const { username,password,email,code,correctCode} = this.data;
    if(!username){
      this.setData({ errorUsername:"请输入用户名" });
      return
    }
    if(!password){
      this.setData({ errorPassword:"请输入密码" });
      return
    }
    if(!email){
      this.setData({ errorEmail:"请输入邮箱" });
      return
    }
    if(!code){
      this.setData({ errorCode:"请输入验证码" });
      return
    }
    if(code == correctCode){
      wx.showLoading();
      this.setData({ errorCode:"" });
      registerUser(username,password).then(res=>{
        wx.hideLoading();
        if(res.code == 0 ){
          wx.showToast({
            title: "注册成功",
            icon: "none",
            duration: 2000,
          });
          wx.navigateTo({
            url: "/pages/login/index",
          });
        }else if(res.code == 403){
          wx.showToast({
            title: "已存在该用户，请重新填写用户名",
            icon: "none",
            duration: 2000,
          });
        }
      })
    }else{
      this.setData({ errorCode:"验证码错误" });
      return
    }
  },
});
